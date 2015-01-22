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
