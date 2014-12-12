var Joi = require('joi');

module.exports = {
    list: {
        handler: function(request, reply){
            var settings = require('../bootstrap/settings');
            var data = {};
            for (var key in settings.widgets) {
                settings.widgets[key].href = request.server.info.uri + request.path + '/' + key;
            }
            var json = {
                _links: { self: { href: request.server.info.uri + request.url.href }},
                data: settings.widgets
            };
            reply(json).type('application/hal+json');
        },
        app: {
            name: 'list'
        }
    },
    widget: {
        handler: function(request, reply){
            var query = request.query;
            delete query.maxheight;
            delete query.maxwidth;

            var json = {
                title: "Not a Real oEmbed Response",
                widget: request.server.info.uri + '/v0/widget/' + request.params.type,
                height: request.query.maxheight || 0,
                width: request.query.maxwidth || 0,
                src: query
            };
            reply(json);
        },
        validate: {
            query: {
                url: Joi.required(),
                maxwidth: Joi.number().integer().min(1).default(300),
                maxheight: Joi.number().integer().min(1).default(300),
                // Apparently no way to blanket allow parameters.
                limit: Joi.optional(),
                offset: Joi.optional(),
                preset: Joi.optional(),
                profile: Joi.optional(),
                filters: Joi.optional(),
                facets: Joi.optional(),
                query: Joi.optional(),
                sort: Joi.optional(),
                fields: Joi.optional()
            }
        },
        app: {
            name: 'widget'
        }
    }
}
