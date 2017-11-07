var $ = require('tinyselector');
var View = require('../view.js');

function Anchor(options) {
  View.apply(this, arguments);
}

var proto = Anchor.prototype = Object.create(View.prototype);

proto.create = function() {
  return $('<a href="javascript:;" class="xw-anchor">')[0];
};

proto.init = function(o) {
  View.prototype.init.apply(this, arguments);
  this.update();
};

proto.update = function() {
  var o = this.options();
  
  this.text(o.text);
};

proto.text = function(text) {
  var o = this.options();
  var el = $(this.dom());
  if( !arguments.length ) return o.text;
  el.html(text);
  o.text = text;
  return this;
};

proto.href = function(href) {
  var o = this.options();
  var el = $(this.dom());
  if( !arguments.length ) return o.href;
  el.attr('href', href);
  o.href = href;
  return this;
};

View.type('anchor', Anchor);
module.exports = Anchor;