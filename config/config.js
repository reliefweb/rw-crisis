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