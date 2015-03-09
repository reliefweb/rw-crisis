var path = require('path');
var io = require('./io')();

module.exports = function(config, opts) {
  var Config = config;
  var Opts = opts;
  var module = {};
  var version = require('../../package.json').version;
  var now = new Date().toISOString();

  module.location = function(slug, base) {
    return path.join(base, 'config', slug + '.json');
  };

  module.dest = function(slug) {
    return module.location(slug, Opts.dest);
  };

  module.url = function(slug) {
    return module.location(slug, './');
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
      if (widget.config.url) {
        var filePath = module.dest(widget.slug);
        status = io.download(widget.config.url, filePath, module.transformer);
        if (!status) {
          console.error('Failed to download config for widget "' + widget.title + '" to "' + filePath + '"');
        }
        else {
          console.log('Downloaded config for widget "' + widget.title + '" to "' + filePath + '"');
          // Rewrite the URL so when we update main config from memory it points to the local widget config.
          widget.config.url = module.url(widget.slug);
        }
      }

      return widget;
    });
  };

  module.updatePrimaryConfig = function() {
    Config = module.transformer(Config);
    delete Config.processed.date.downloaded;
    Config.processed.date.processed_on = now;
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