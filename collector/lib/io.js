var fs = require('fs-extra');
var path = require('path');
var agent = require('superagent');

module.exports = function() {
  var module = {};

  module.fileExists = function(filePath) {
    var stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      return console.error('File "' + filePath + '" could not be found.');
    }

    return true;
  };

  module.readJSON = function(filePath) {
    try {
      var json = fs.readJsonSync(filePath);
    }
    catch(e) {
      return console.error('File "' + filePath + '" was empty or produced no valid JSON.');
    }

    return json;
  };

  module.writeJSON = function(data, filePath) {
    // Something is injecting a copy of remotely pulled content. Hacky clean-up.
    if (data[""]) {
      delete data[""];
    }

    fs.outputJson(filePath, data, function(err) {
      if (err) {
        return console.error(err);
      }
      else {
        return console.log('JSON saved to ' + filePath);
      }
    });
  };

  module.purgeUnknown = function(dir, list) {
    fs.readdir(dir, function(err, found) {
      if (!found) {
        return console.log('First-time initialization of widget-configuration.');
      }
      found.forEach(function(item) {
        if (list.indexOf(item) == -1) {
          var deprecated = path.join(dir, item);
          var tmp = path.join('/tmp/crisis-page', item);
          fs.move(deprecated, tmp, function(err) {
            if (err) {
              return console.warn('Deprecated file "' + deprecated + '" identified and left in place. Could not move to "' + tmp + '"');
            }
            return console.log('Deprecated file "' + deprecated + '" found and moved to "' + tmp + '"');
          });
        }
      });

      return true;
    });
  };

  return module;
};
