var $ = require('tinyselector');
var View = require('./view.js');

function Container(options) {
  var self = this;
  View.apply(self, arguments);
}

var proto = Container.prototype = Object.create(View.prototype);

proto.init = function(options) {
  View.prototype.init.apply(this, arguments);
  this.items(options.items);
};

proto.additem = function(o, index, adjust) {
  var self = this;
  var items = self.items();

  if( ~['object', 'string'].indexOf(typeof index) ) {
    var findex = items.indexOf(this.getitem(index));
    if( findex >= 0 ) index = findex + 1;
  }

  if( !Array.isArray(o) ) o = [o];
  if( typeof adjust == 'number' ) {
    index += adjust;
  }

  if( index < 0 ) index = 0;
  
  o.forEach(function(item) {
    if( !item ) return;
    
    var cindex = index;
    if( index >= 0 ) {
      items.splice(cindex, 0, item);
      index = index + 1;
    } else items.push(item);

    self.fire('additem', {item:item, index: cindex});
  });
  
  return self;
};

proto.getitem = function(id) {
  var items = this.items();
  if( typeof id == 'number' ) return items[id];
  
  return items.filter(function(item) {
    return item && (item.id === id || item === id);
  })[0];
};

proto.items = function(items) {
  var self = this;
  if( !arguments.length ) return self._items;
  
  self._items = self._items || [];
  self.clearitems().additem(items);
  return self;
};

proto.clearitems = function() {
  var self = this;
  self.items().forEach(function(item) {
    self.removeitem(item);
  });
  return self;
};

proto.clear = function() {
  var self = this;
  self.clearitems();
  View.prototype.clear.call(self);
  return self;
};

proto.removeitem = function(id) {
  var self = this;
  if( !arguments.length ) return View.prototype.remove.call(self);
  
  var items = self.items();
  var item = self.getitem(id);
  var index = items.indexOf(item);
  if( ~index ) items.splice(index, 1);
  self.fire('removeitem', {item:item});
  return self;
};

module.exports = Container;
