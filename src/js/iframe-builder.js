$(document).ready(function() {
  $.get('config.json', function(data) {
    var config = data;
    var widgets = config.widgets;

    var embed_server = config.environment.sources['reliefweb-embed'];

    var pyms = [];

    widgets.forEach(function(widget) {
      var oembed_url = embed_server + '/v0/oembed/' + widget.slug + '?url=' + widget.config.url;
      $.get(oembed_url, '', function(data) {
        var $markup = $(data.html);
        pyms.push(new pym.Parent(widget.slug, $markup.attr('src'), {}));
      }, 'json');
    });
  });
});