var Hapi = require('hapi')
  , config = require('./src/bootstrap/settings')
  ;

var server = Hapi.createServer('0.0.0.0', config.port);

// Setup the views engine and folder
server.views({
    engines: {
        html: require('swig')
    },
    path: './server/views'
});

// Export the server to be required elsewhere.
module.exports = server;

// Bootstrap Hapi Server Plugins
require('./src/bootstrap/plugins');

// Add the server routes
server.route(require('./src/bootstrap/routes'));

// Start the server.
server.start(function() {
    // Log to the console the host and port info.
    console.log('Server started at: ' + server.info.uri);
});
