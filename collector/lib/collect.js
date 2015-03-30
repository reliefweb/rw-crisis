var agent = require('superagent');
var async = require('async');
var fs = require('fs-extra');
var path = require('path');
var io = require('./io')();
var log = require('./log');

module.exports = function(config, opts) {
  var module = {};
  var skymap = require('./skymap')(config.environment.sources);
  var version = require('../../package.json').version;
  var now = new Date().toISOString();

  module.dest = function(slug) {
    return path.join(opts.dest, opts['widget-config-path'], slug + '.json');
  };

  module.url = function(slug) {
    // baseUrl is expected to have a trailing slash.
    return config.environment.baseUrl + opts['widget-config-path'] + '/' + slug + '.json';
  };

  module.signature = function(data) {
    data.processed = {
      generator: 'collector',
      version: version,
      date: {
        updated: now
      }
    };

    return data;
  };

  module.updatePrimaryConfig = function() {
    var collectMainConfig = async.seq(signConfig, inlineRequestData, saveConfig);

    collectMainConfig({
      filePath: opts.config,
      name: 'Main Config',
      content: config
    }, function(result, err) {
      // WARNING: result, err is the OPPOSITE order expected. This seems likely to be "fixed" at some point.
      if (err)
        log.error({
          type: 'Process',
          widget: result.name,
          destination: result.filePath
        }, 'Could not process configuration file.');
      else
        log.info({
          type: 'Process',
          widget: result.name,
          destination: result.filePath
        }, 'Configuration has completed processing.');
    });
  };

  // Warn about any configuration files that are no longer mentioned.
  module.verifyDownloadedConfig = function() {
    io.purgeUnknown(path.dirname(module.dest('')),
      config.widgets.map(function(item) {
        return item.slug + '.json';
      })
    );
  };

  // Pull any remote referenced widget configuration files.
  module.saveRemoteConfig = function() {
    var loadConfig = opts.local ? loadLocalConfig : downloadRemoteConfig;

    var collectRemoteConfig = async.seq(loadConfig, signConfig, inlineRequestData, insertEnvironment, saveConfig);

    config.widgets.map(function(widget) {
      // If there is not a URL, assume there is no remote configuration.
      if (widget.config.url) {
        var url = widget.config.sourceUrl || widget.config.url;
        var filePath = module.dest(widget.slug);

        collectRemoteConfig({
          url: url,
          filePath: filePath,
          name: widget.slug,
          content: {}
        }, function(result, err) {
          // WARNING: result, err is the OPPOSITE order expected. This seems likely to be "fixed" at some point.
          if (err)
            log.error({
              type: 'Process',
              url: result.url,
              widget: result.name,
              destination: result.filePath
            }, 'Processing of remote configuration failed.');
          else
            log.info({
              type: 'Process',
              url: result.url,
              widget: result.name,
              destination: result.filePath
            }, 'Widget configuration completed processing.');
        });

        if (!widget.config.sourceUrl) {
          widget.config.sourceUrl = widget.config.url;
        }
        widget.config.url = module.url(widget.slug);
      }

      return widget;
    });
  };

  function loadLocalConfig(item, callback) {
    item.content = require(path.join('../../config/config', item.name));
    callback(null, item);
  }

  function downloadRemoteConfig(item, callback) {
    var request = agent.get(item.url).end(function(err, response) {
      if (err) {
        log.error({
          type: 'Process',
          url: item.url,
          destination: item.filePath,
          widget: item.name,
          err: err
        }, 'Widget retrieval failed without reaching remote server.');
        callback(err, item);
      }
      else if (response.error) {
        log.error({
          type: 'Process',
          url: item.url,
          destination: item.filePath,
          widget: item.name,
          'error-message': response.error.message,
          'error-code': response.status
        }, 'Widget retrieval failed.');
        callback(true, item);
      }

      try {
        item.content = JSON.parse(response.text);
      }
      catch(e) {
        log.error({
          type: 'Process',
          url: item.url,
          destination: item.filePath,
          widget: item.name
        }, 'Content was empty or produced no valid JSON.');
        callback(true, item);
      }

      log.info({
        type: 'Process',
        url: item.url,
        destination: item.filePath,
        widget: item.name
      }, 'Successfully retrieved data.');
      callback(null, item);
    });
  }

  function signConfig(item, callback) {
    item.content = module.signature(item.content);
    item.content.processed.name = item.name;
    log.debug({
      type: 'Process',
      url: item.url,
      destination: item.filePath,
      widget: item.name
    }, 'Added basic processing metadata.');
    callback(null, item);
  }

  function inlineRequestData(item, callback) {
    log.debug({
      type: 'Process',
      url: item.url,
      destination: item.filePath,
      widget: item.name
    }, 'About to begin skymap.');
    skymap.process(item, callback);
  }

  function insertEnvironment(item, callback) {
    item.content.environment = {};
    item.content.environment.sources = config.environment.sources;
    item.content.environment.content = config.environment.baseUrl;
    log.debug({
      type: 'Process',
      url: item.url,
      destination: item.filePath,
      widget: item.name
    }, 'Added crisis page environment configuration.');
    callback(null, item);
  }

  function saveConfig(item, callback) {
    fs.outputJson(item.filePath, item.content, function(err) {
      if (err)
        log.error({
          type: 'Process',
          url: item.url,
          destination: item.filePath,
          widget: item.name,
          err: err
        }, 'Could not save configuration to destination file.');
      else
        log.info({
          type: 'Process',
          url: item.url,
          destination: item.filePath,
          widget: item.name,
          err: err
        }, 'Successfully saved data.');
      callback(item);
    });
  }

  return module;
};
