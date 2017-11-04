var $ = require('tinyselector');
var View = require('../view.js');

function Label(options) {
  View.apply(this, arguments);
}

var proto = Label.prototype = Object.create(View.prototype);

proto.create = function() {
  return $('<div class="xw-label"></div>')[0];
};

module.exports = Label;