// Load the server
var settings = require('./settings'),
    server = require(settings.rootPath + '/server');

// Options to pass into the 'Good' plugin
var goodOptions = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        args:[{ log: '*', request: '*', error: '*' }]
    }, {
        reporter: require('good-file'),
        args: ['./system.log', { log: '*', request: '*', ops: '*', error: '*' }]
    }]
};

server.pack.register([
    {
        plugin: require("good"),
        options: goodOptions
    },
    {
        plugin: require("hapi-named-routes")
    }
], function(err) {
    if (err) throw err;
});
