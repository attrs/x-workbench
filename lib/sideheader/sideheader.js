var $ = require('tinyselector');
var View = require('../view.js');

function SideHeader(options) {
  View.apply(this, arguments);
}

var proto = SideHeader.prototype = Object.create(View.prototype);

proto.create = function() {
  return $('<ul class="xw-sideheader"/>')[0];
};

proto.render = function() {
  
  return this;
};

module.exports = SideHeader;