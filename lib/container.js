var $ = require('tinyselector');
var View = require('./view.js');

function Container(options) {
  View.apply(this, arguments);
  
  var self = this;
  var el = $(self.dom());
  var o = self.options();
  
  if( o.flexbox ) el.attr('flexbox', o.flexbox);
  
  o.items && o.items.forEach(function(item) {
    self.add(item);
  });
}

var proto = Container.prototype = Object.create(View.prototype);

proto.add = function(view) {
  view = View.create(view);
  $(this.dom()).append(view.dom());
  return this;
};

proto.children = function() {
  return $(this.dom()).children().map(function(el) {
    return el.view;
  }).filter(function(item) {
    return item;
  });
};

module.exports = Container;