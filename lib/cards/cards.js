var $ = require('tinyselector');
var View = require('../view.js');
var Container = require('../container.js');

function Cards(options) {
  View.apply(this, arguments);
}

var proto = Cards.prototype = Object.create(Container.prototype);

proto.create = function() {
  return $('<div class="xw-cards"></div>')[0];
};

proto.init = function(o) {
  var self = this;
  var el = $(self.dom());
  
  self.on('additem', function(e) {
    var item = e.detail.item;
    var view = View.create(item);
    view.dom()._item = item;
    el.append(view.dom());
    self.update();
  })
  .on('removeitem', function(e) {
    el.children().each(function() {
      if( e.detail.item === this._item ) $(this).remove();
    });
    self.update();
  });
  
  Container.prototype.init.apply(self, arguments);
};

proto.selected = function() {
  return this._selected;
};

proto.select = function(id) {
  var self = this;
  var item = self.getitem(id);
  if( item ) self._selected = item;
  return self.update();
};

proto.update = function() {
  var self = this;
  if( !self.items().length ) return this;
  
  var el = $(self.dom());
  var selected = self.selected() || self.getitem(0);
  
  el.children().each(function() {
    var cdom = this;
    var cel = $(this);
    var cview = this.view;
    var citem = this._item;
    if( citem === selected ) {
      if( !cel.hc('active') ) {
        cel.ac('active');
        cview && cview.fire('activate', { container: self });
        self.fire('select', { selected: citem, view: cview });
      }
    } else {
      if( cel.hc('active') ) {
        cel.rc('active');
        cview && cview.fire('deactivate', { container:self });
      }
    }
  });
  
  return self;
};

View.type('cards', Cards);
module.exports = Cards;