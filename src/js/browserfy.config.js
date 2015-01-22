(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  "widgets": [
    {
      "key": "customWidget",
      "title": "I am a customWidget",
      "widgetType": "image",
      "widgetConfig": {
        "title": "Another Image Widget",
        "template": "#image-template",
        "templatePartial": "templates/imageWidget.handlebars",
        "src": "http://lorempixel.com/400/200/",
        "credit": "Photo by LoremPixel"
      }
    }
  ]
}

},{}],2:[function(require,module,exports){
  var config = require("../../config/config.json");
  var widgets = config.widgets;
  //console.log(widgets);



  // TODO: Find out why variables aren't being passed in.
  // TODO: Find out how to render external files.
  widgets.forEach(function(widget){
    console.log(widget);
    var widgetDiv = "#" + widget.key;
    imageWidget = ReliefwebWidgets.widget("image", {
      title: "Another Image Widget",
      template: "#image-template",
      src: 'http://lorempixel.com/400/200/',
      credit: "Photo by LoremPixel"
    });
    imageWidget.render(widgetDiv);
  });

},{"../../config/config.json":1}]},{},[2]);
