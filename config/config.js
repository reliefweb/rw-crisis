var config = require("./config.json");
var widgets = config.widgets;

widgets.forEach(function(widget){
  var widgetDiv = "#" + widget.key;
  var widgetConfig = widget.config;
  widgetConfig.template = Handlebars.templates[widgetConfig.template];
  var newWidget = ReliefwebWidgets.widget(widget.type, widgetConfig);
  newWidget.render(widgetDiv);
});
