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
  "widgets": [
    {
      "key": "customWidget",
      "title": "I am a customWidget",
      "type": "image",
      "config": {
        "title": "Another Image Widget",
        "template": "image.hbs",
        "src": "http://lorempixel.com/400/200/",
        "credit": "Photo by LoremPixel"
      }
    },
    {
      "key": "crisisOverview",
      "title": "Crisis Overview",
      "type": "crisis-overview",
      "config": {
        "template": "crisis-overview.hbs",
        "title": "Crisis Overview",
        "dataSource": "Data Source <cite><a href=\"\">UNHCR</a></cite>",
        "map": {
          "src": "img/overview-map.jpg",
          "alt": "Syria/Iraq"
        },
        "content": {
          "syria": {
            "title": "Syria",
            "content": "<p>The <b>Syrian Civil War</b>, also known as the <b>Syrian Revolution</b>, is an ongoing armed conflict taking place in Syria. The unrest began in the early spring of 2011 within the context of <a href=\"/wiki/Arab_Spring\" title=\"Arab Spring\">Arab Spring</a> protests, with nationwide protests against President Bashar al-Assad's government, whose forces responded with violent crackdowns. The conflict gradually morphed from popular protests to an armed rebellion after months of military sieges.</p><p>The armed opposition consists of various groups that were formed during the course of the conflict, primarily the Free Syrian Army, which was the first to take up arms in 2011, and the <a href=\"/wiki/Islamic_Front_(Syria)\" title=\"Islamic Front (Syria)\">Islamic Front</a> formed in 2013. In 2013, Hezbollah entered the war in support of the Syrian army. In the east, the <a href=\"/wiki/Islamic_State_of_Iraq_and_the_Levant\" title=\"Islamic State of Iraq and the Levant\">Islamic State of Iraq and the Levant</a> (ISIL), a jihadist militant group originating from Iraq, made very rapid military gains in both Syria and Iraq, eventually conflicting with the other rebels. In July 2014, ISIL controlled a third of Syria's territory and most of its oil and gas production, thus establishing itself as the major opposition force.</p>",
            "indicator": {
              "data": [
                {
                  "figure": "4",
                  "quantifier": "million",
                  "description": "Refugees"
                },
                {
                  "figure": "7.5",
                  "quantifier": "million",
                  "description": "Internally Displaced"
                }
              ]
            }
          },
          "iraq": {
            "title": "Iraq",
            "content": "<p>The Islamic State insurgency has compounded an already fragile political situation, leading to a level 3 humanitarian crisis and international military intervention. In 2014, four massive waves of internal displacement have taken place: Anbar in January, Mosul in June, Sinjar in August and Hit in October. Priority humanitarian needs are food, water, shelter, and fuel. Protection and the risk of disease outbreak are also concerns. Iraq now hosts one of the largest internally displaced populations in the world. Host communities are increasingly stretched.</p>",
            "indicator": {
              "data": [
                {
                  "figure": "4",
                  "quantifier": "million",
                  "description": "Refugees"
                },
                {
                  "figure": "7.5",
                  "quantifier": "million",
                  "description": "Internally Displaced"
                }
              ]
            }
          }
        }
      }
    }
  ]
}

},{}],2:[function(require,module,exports){
// This file is used to process the config option for each widget. A grunt task
// called browserfy is then used to "browserfy" this file and then copy it to
// the src directory.
var config = require("./config.json");
var widgets = config.widgets;

widgets.forEach(function(widget){
  var widgetDiv = "#" + widget.key;
  var widgetConfig = widget.config;
  widgetConfig.template = Handlebars.templates[widgetConfig.template];
  var newWidget = ReliefwebWidgets.widget(widget.type, widgetConfig);
  newWidget.render(widgetDiv);
});
},{"./config.json":1}]},{},[2])(2)
});