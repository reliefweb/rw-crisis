var fs = require('fs-extra');
var path = require('path');
var log = require('./log');

module.exports = function() {
  var module = {};

  module.fileExists = function(filePath) {
    var stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      log.warn({ type: 'Filesystem' }, 'File "' + filePath + '" could not be found.');
      return false;
    }

    return true;
  };

  module.readJSON = function(filePath) {
    try {
      var json = fs.readJsonSync(filePath);
    }
    catch(e) {
      log.warn({ type: 'Filesystem' }, 'File "' + filePath + '" was empty or produced no valid JSON.');
      return {};
    }

    return json;
  };

  module.purgeUnknown = function(dir, list) {
    fs.readdir(dir, function(err, found) {
      if (!found) {
        log.info({ type: 'Filesystem' }, 'Directory is empty, nothing to purge.');
        return true;
      }
      found.forEach(function(item) {
        if (list.indexOf(item) == -1) {
          var deprecated = path.join(dir, item);
          var tmp = path.join('/tmp/crisis-page', item);
          fs.move(deprecated, tmp, function(err) {
            if (err) {
              log.warn({ type: 'Filesystem' },
                'Deprecated file "' + deprecated + '" identified and left in place. Could not move to "' + tmp + '"');
              return false;
            }
            log.info({ type: 'Filesystem' }, 'Deprecated file "' + deprecated + '" found and moved to "' + tmp + '"');
          });
        }
      });

      return true;
    });
  };

  return module;
};
