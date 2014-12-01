// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
module.exports = {
    index: {
        handler: function(request, reply){
          // Render the view with the custom greeting
            reply('index')
        },
        app: {
            name: 'index'
        }
    },
    v0: {
        handler: function(request, reply){
            reply('v0')
        },
        app: {
            name: 'v0'
        }
    },
    missing: {
        handler: function(request, reply){
            reply('404').code(404);
        },
        app: {
            name: '404'
        }
    }
}
