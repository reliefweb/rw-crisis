(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['crisis-overview.hbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "      <input type=\"checkbox\" id=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" class=\"accordion-set--check\"";
  stack1 = helpers['if'].call(depth0, (data && data.index), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n      <label for=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" class=\"accordion-set--label\"><h2>"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</h2></label>\n      <div class=\"accordion-set--content\" data-eq-pts=\"cols2: 500\">\n        ";
  stack1 = lambda((depth0 != null ? depth0.content : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n      </div>\n";
},"2":function(depth0,helpers,partials,data) {
  return "";
},"4":function(depth0,helpers,partials,data) {
  return " checked=\"checked\"";
  },"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <input type=\"radio\" name=\"tab\" id=\"tab-"
    + escapeExpression(lambda((data && data.index), depth0))
    + "\" class=\"tab-set--tab\"";
  stack1 = helpers['if'].call(depth0, (data && data.index), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "/>\n    <label for=\"tab-"
    + escapeExpression(lambda((data && data.index), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</label>\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "      <div id=\"tab-body-"
    + escapeExpression(lambda((data && data.index), depth0))
    + "\" class=\"tab-set--body\">\n        <h2>"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</h2>\n        <i class=\"un-icon-crisis_population_displacement\"></i>\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.indicator : depth0)) != null ? stack1.data : stack1), {"name":"each","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </div>\n";
},"9":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <div class=\"refugees\">\n          <h3><span class=\"figure\">"
    + escapeExpression(lambda((depth0 != null ? depth0.figure : depth0), depth0))
    + "</span> "
    + escapeExpression(lambda((depth0 != null ? depth0.quantifier : depth0), depth0))
    + "</h3>\n          <p>"
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"overview-widget\">\n  <h1 class=\"overview-widget--title\"><span><i class=\"un-icon-crisis_conflict\"></i>";
  stack1 = ((helper = (helper = helpers.adjustedTitle || (depth0 != null ? depth0.adjustedTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"adjustedTitle","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span></h1>\n  <div class=\"overview-widget--map\">\n    <img src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.map : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\" />\n  </div>\n  <div class=\"overview-widget--description\">\n    <div class=\"accordion-set\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.content : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n  </div>\n  <div class=\"overview-widget--tabs tab-set\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.content : depth0), {"name":"each","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <div class=\"tab-set--content\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.content : depth0), {"name":"each","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n  </div>\n  <footer class=\"overview-widget--sources\">";
  stack1 = ((helper = (helper = helpers.dataSource || (depth0 != null ? depth0.dataSource : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dataSource","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</footer>\n</div>";
},"useData":true});
})();