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

var pyms = [];

widgets.forEach(function(widget) {
  var oembed_url = oembed_server + '/v0/oembed/' + widget.slug + '?url=' + widget.config.url;
  $.get(oembed_url, '', function(data) {
    var $markup = $(data.html);
    //$markup.attr("scrolling", "no").addClass('oembed');
    //$("#" + widget.slug).html($markup);
    pyms.push(new pym.Parent(widget.slug, $markup.attr('src'), {}));
  }, 'json');
});
