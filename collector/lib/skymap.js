var agent = require('superagent');
var async = require('async');
var jsonpath = require('jsonpath');
var obj = require('getobject');
var traverse = require('traverse');

module.exports = function(sources) {
  var module = {};

  // Traverse a JSON object looking for any object with the type: 'request' property.
  // When one is found pass the object to be converted into an API request.
  // rawData is an object of the form:
  // {
  //   name: 'machine name',
  //   url: 'optional url if canonically hosted elsewhere.',
  //   filePath: 'Spot on disk it is intended to go',
  //   content: {data: 'content to be processed by skymap' }
  // }
  module.process = function(data, handler) {
    // Set up a worker queue to manage HTTP requests.
    var queue = async.queue(module.request,
      Math.max((require('os').cpus().length || 1) * 2, 2));

    // The traverse library appears to be blocking. As a result, we can rely on
    // pause()/resume() rather than implement a more complex token-counting mechanism.
    queue.pause();
    queue.drain = function() {
//      if (rawData.name == 'Main Config') console.log(Data);

      // Something is injecting a copy of remotely pulled content. Hacky clean-up.
      if (data.content[""]) delete data.content[""];
      console.log('[' + data.name + '] skymap processing completed');
      handler(null, data);
    };

    // Enqueue jobs based on any child object of the data that is of the 'request' type.
    // Children of said type do not need to be traversed, but it's not clear the best way
    // to kick back the traversal mechanism in that case, will revisit later.
    traverse(data.content).forEach(function(item) {
      if (item.hasOwnProperty('type') && item.type == 'request') {
        var segment = { path: this.path.join('.'), data: data };
        console.log('[' + data.name + '] found item for processing at "' + segment.path + '"');
        queue.push([segment]);
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
    // Sometimes this function receives no path from the queue worker. How this
    // happens is unclear, but processing the null path results in breaks.
    if (item.path.length === 0) { done(); return; }

    var definition = obj.get(item.data.content, item.path);

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

      // Apply JSONPath selector.
      if (definition.selector === undefined) definition.content = content;
      else definition.content = jsonpath.query(content, definition.selector);

      // Add processing metadata
      if (definition.date === undefined) definition.date = {};
      var now = new Date().toISOString();
      definition.date.checked = now;
      if (updated) definition.date.updated = now;

      obj.set(item.data.content, item.path, definition);
      done();
    });

  };

  return module;
};
