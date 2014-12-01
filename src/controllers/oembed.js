module.exports = {
    oembed_v0: {
        handler: function(request, reply){
            reply('oembed')
        },
        app: {
            name: 'oembed_v0'
        }
    }
}
