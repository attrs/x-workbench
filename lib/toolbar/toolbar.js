var $ = require('tinyselector');
var View = require('../view.js');
var Container = require('../container.js');

function Toolbar(options) {
  Container.apply(this, arguments);
}

var proto = Toolbar.prototype = Object.create(Container.prototype);

proto.create = function(o) {
  return $('<div class="xw-toolbar"></div>')[0];
};

proto.init = function(o) {
  var self = this;
  var el = $(self.dom());
  
  self.on('additem', function(e) {
    var item = e.detail.item;
    var index = e.detail.index;
    var view = View.create(item, 'button');
    view.dom()._item = item;
    el.append(view.dom(), index);
  })
  .on('removeitem', function(e) {
    el.children().each(function() {
      if( e.detail.item === this._item ) $(this).remove();
    });
  });
  
  Container.prototype.init.apply(self, arguments);
};

View.type('toolbar', Toolbar);
module.exports = Toolbar;