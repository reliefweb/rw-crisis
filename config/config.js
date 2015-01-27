// This file is used to process the config option for each widget. A grunt task
// called browserfy is then used to "browserfy" this file and then copy it to
// the src directory.

// Dependency: oembed-client-cors
var config = require("./config.json");
var widgets = config.widgets;

// var $ = jQuery;
// var _ = lodash;

var oembed_server = config['oembed-server'];
//var oembed_server = "http://localhost:3000";

//var self_domain = window.location.host + '/';
var self_domain = '';

widgets.forEach(function(widget) {
  var oembed_url = oembed_server + '/v0/oembed/' + widget.slug + '?' + $.param(widget.config);

  if (widget.slug == 'timeline') {
    $('#' + widget.slug).html('<iframe class="oembed" src="' + oembed_server + '/v0/widgets/timeline?country[]=Iraq&country[]=Syria' + '" height="800px"></iframe>');
  } else {
    $.get(oembed_url, '', function(data) {
      var $markup = $(decodeURI(data.html));
      $markup.addClass('oembed');
      $("#" + widget.slug).html($markup);
    }, 'json');
  }
});
