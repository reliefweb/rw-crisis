var agent = require('superagent');
var async = require('async');
var fs = require('fs-extra');
var path = require('path');
var io = require('./io')();

module.exports = function(config, opts) {
  var Config = config;
  var Opts = opts;

  var module = {};

  var skymap = require('./skymap')(Config.environment.sources);
  var version = require('../../package.json').version;
  var now = new Date().toISOString();

  module.dest = function(slug) {
    return path.join(Opts.dest, Opts['widget-config-path'], slug + '.json');
  };

  module.url = function(slug) {
    // baseUrl is expected to have a trailing slash.
    return Config.environment.baseUrl + Opts['widget-config-path'] + '/' + slug + '.json';
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
      filePath: Opts.config,
      name: 'Main Config',
      content: Config
    }, function(result, err) {
      // WARNING: result, err is the OPPOSITE order expected. This seems likely to be "fixed" at some point.
      if (err)
        console.error('[' + result.name + '] Could not process configuration file.');
      else
        console.log('[' + result.name + '] Configuration has completed processing.');
    });
  };

  // Warn about any configuration files that are no longer mentioned.
  module.verifyDownloadedConfig = function() {
    io.purgeUnknown(path.dirname(module.dest('')),
      Config.widgets.map(function(item) {
        return item.slug + '.json';
      })
    );
  };

  // Pull any remote referenced widget configuration files.
  module.saveRemoteConfig = function() {
    var collectRemoteConfig = async.seq(downloadRemoteConfig, signConfig, inlineRequestData, saveConfig);

    Config.widgets.map(function(widget) {
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
            console.error('[' + result.name + '] Failed to download config for widget "' + widget.title + '" to "' + filePath + '"');
          else
            console.log('[' + result.name + '] Configuration for "' + widget.title + '" has completed processing.');
        });

        if (!widget.config.sourceUrl) {
          widget.config.sourceUrl = widget.config.url;
        }
        widget.config.url = module.url(widget.slug);
      }

      return widget;
    });
  };

  function downloadRemoteConfig(item, callback) {
    var request = agent.get(item.url).end(function(err, response) {
      if (err) {
        console.error(err);
        callback(err, item);
      }
      else if (response.error) {
        console.error('HTTP ' + response.status + ': ' + response.error.message);
        callback(true, item);
      }

      try {
        item.content = JSON.parse(response.text);
      }
      catch(e) {
        console.error('Data retrieved from "' + item.url + '" is not valid JSON.');
        callback(true, item);
      }

      console.log('[' + item.name + '] retrieved data from "' + item.url + '"');
      callback(null, item);
    });
  }

  function signConfig(item, callback) {
    item.content = module.signature(item.content);
    console.log('[' + item.name + '] added basic processing metadata');
    callback(null, item);
  }

  function inlineRequestData(item, callback) {
    console.log('[' + item.name + '] about to begin skymap');
    skymap.process(item, callback, 'content');
  }

  function saveConfig(item, callback) {
    // Something is injecting a copy of remotely pulled content. Hacky clean-up.
    if (item.content[""]) {
      delete item.content[""];
    }

    fs.outputJson(item.filePath, item.content, function(err) {
      if (err) console.error(err);
      else console.log('[' + item.name + '] data saved to "' + item.filePath + '"');
      callback(item);
    });
  }

  return module;
};
