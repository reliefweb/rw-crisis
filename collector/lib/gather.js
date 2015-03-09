var path = require('path');
var io = require('./io')();

module.exports = function(config, opts) {
  var Config = config;
  var Opts = opts;
  var module = {};
  var version = require('../../package.json').version;
  var now = new Date().toISOString();

  module.dest = function(slug) {
    return path.join(Opts.dest, Opts['widget-config-path'], slug + '.json');
  };

  module.url = function(slug) {
    // baseUrl is expected to have a trailing slash.
    return Config.environment.baseUrl + Opts['widget-config-path'] + '/' + slug + '.json';
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
    var status = false;

    Config.widgets.map(function(widget) {
      // If there is not a URL, assume there is no remote configuration.
      if (widget.config.url) {
        var url = widget.config.sourceUrl || widget.config.url;
        var filePath = module.dest(widget.slug);
        status = io.download(url, filePath, module.transformer);
        if (!status) {
          console.error('Failed to download config for widget "' + widget.title + '" to "' + filePath + '"');
        }
        else {
          console.log('Downloaded config for widget "' + widget.title + '" to "' + filePath + '"');
          // Preserve the original URL for repeat-processing but use the local URL for operations.
          if (!widget.config.sourceUrl) {
            widget.config.sourceUrl = widget.config.url;
          }
          widget.config.url = module.url(widget.slug);

        }
      }

      return widget;
    });
  };

  module.updatePrimaryConfig = function() {
    Config = module.transformer(Config);
    delete Config.processed.date.downloaded;
    Config.processed.date.processedOn = now;
    io.writeJSON(Config, Opts.config);
  };

  module.transformer = function(data) {
    data.processed = {
      generator: 'collector',
      version: version,
      date: {
        downloaded: now
      }
    };

    return data;
  };

  return module;
};