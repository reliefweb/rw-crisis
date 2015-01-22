  var config = require("./config.json");
  var widgets = config.widgets;

  widgets.forEach(function(widget){
    var widgetDiv = "#" + widget.key;
    var widgetConfig = widget.widgetConfig;
    widgetConfig.template = Handlebars.templates[widgetConfig.template];
    imageWidget = ReliefwebWidgets.widget("image", widgetConfig);
    imageWidget.render(widgetDiv);
  });
