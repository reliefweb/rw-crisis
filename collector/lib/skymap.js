var async = require('async');
var agent = require('superagent');
var obj = require('getobject');
var traverse = require('traverse');
var extend = require('util')._extend;

var io = require('./io')();

module.exports = function(sources) {
  var module = {};
  var Data;

  // Traverse a JSON object looking for any object with the type: 'request' property.
  // When one is found pass the object to be converted into an API request.
  // rawData is an object of the form:
  // {
  //   name: 'machine name',
  //   url: 'optional url if canonically hosted elsewhere.',
  //   filePath: 'Spot on disk it is intended to go',
  //   content: {data: 'content to be processed by skymap' }
  // }
  module.process = function(rawData, handler) {
    Data = rawData['content'];
    // Set up a worker queue to manage HTTP requests.
    var queue = async.queue(module.request,
      Math.max((require('os').cpus().length || 1) * 2, 2));

    // The traverse library appears to be blocking. As a result, we can rely on
    // pause()/resume() rather than implement a more complex token-counting mechanism.
    queue.pause();
    queue.drain = function() {
      rawData['content'] = Data;
      console.log('[' + rawData.name + '] skymap processing completed');
      handler(null, rawData);
    };

    // Enqueue jobs based on any child object of the data that is of the 'request' type.
    // Children of said type do not need to be traversed, but it's not clear the best way
    // to kick back the traversal mechanism in that case, will revisit later.
    traverse(Data).forEach(function(item) {
      if (item.hasOwnProperty('type') && item.type == 'request') {
        queue.push([this.path]);
        // Used to block unnecessary processing of child elements.
        // Request objects are a "leaf" for our purposes.
        this.update(item, true)
      }
    });

    // If nothing was added to the queue, the handoff from skymap to the provided
    // handler callback needs to be manually triggered.
    if (queue.idle()) {
      queue.drain();
    }

    queue.resume();
  };

  // Issues the API request and adds some timestamp information.
  module.request = function(item, done) {
    var definition = obj.get(Data, item);
    var uri = sources[definition['source']] + '/' + definition.path;
    var method = definition.method || 'GET';
    var content = definition.fallback || 'No content retrieved';

    var request = new agent(method, uri).end(function(err, response) {
      var updated = false;
      if (err) {
        console.error(err);
      }
      else if (response.error) {
        console.error('HTTP ' + response.status + ': ' + response.error.message);
      }
      else {
        try {
          content = JSON.parse(response.text);
        }
        catch (e) {
          return console.error('Invalid JSON retrieved from ' + uri);
        }
        updated = true;
      }

      // @todo here is where we will add the XPath-like selector.
      definition.content = content;
      if (definition.date === undefined) definition.date = {};
      var now = new Date().toISOString();
      definition.date.checked = now;
      if (updated) definition.date.updated = now;

      obj.set(Data, item.join('.'), definition);
      done();
    });

  };

  return module;
};
