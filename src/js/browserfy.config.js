!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReliefwebWidgets=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "page-title": "UN Crisis Page - Syria / Iraq",
  "meta": [
    {
      "name": "viewport",
      "content": "width=device-width, initial-scale=1"
    },
    {
      "name": "description",
      "content": "Test Meta Description"
    },
    {
      "name": "author",
      "content": "United Nations"
    }
  ],
  "oembed-server": "http://embed.unrw.p2devcloud.com:3000",
  "widgets": [
    {
      "slug": "crisis-overview",
      "title": "Crisis Overview",
      "config": {
        "url": "https://gist.githubusercontent.com/fillerwriter/91db8ab49a6df8e1d328/raw/277b52f459c08b5bb2091d30da9586ce768d2496/gistfile1.js"
      }
    },
    {
      "slug": "timeline",
      "title": "Timeline",
      "config": {
        "url": "https://gist.githubusercontent.com/fillerwriter/cdd51cfb738db4daca38/raw/3d31322c26d16e74de7a465a618b17e772578943/gistfile1.json"
      }
    }
  ]
}

},{}],2:[function(require,module,exports){
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

},{"./config.json":1}]},{},[2])(2)
});