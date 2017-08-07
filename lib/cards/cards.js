var $ = require('tinyselector');
var View = require('../view.js');
var Container = require('../container.js');

function Cards(options) {
  View.apply(this, arguments);
  
  var self = this;
  var o = self.options();
  self.items(o.items);
}

var proto = Cards.prototype = Object.create(Container.prototype);

proto.create = function() {
  return $('<div class="xw-cards"></div>')[0];
};

proto.items = function(items) {
  var self = this;
  items && items.forEach(function(item) {
    if( !item ) return;
    self.add(item);
  });
  return this;
};

proto.add = function(item, index) {
  if( !item ) return this;
  
  var self = this;
  var view = View.create(item);
  $(self.dom()).append(view.dom(), index);
  
  return self.validate();
};

proto.remove = function(id) {
  if( !arguments.length ) return View.prototype.remove.call(this);
  
  var self = this;
  var index = self.indexOf(id);
  if( ~index ) {
    $(self.dom().children[index]).remove();
  }
  return self.validate();
};

proto.get = function(id) {
  if( !id && id !== 0 ) return null;
  
  var body = this.dom();
  var children = body.children;
  if( typeof id == 'number' ) return children[id] && children[id].view;
  if( typeof id != 'string' ) return null;
  
  return $(body).children('#' + id).map(function(el) {
    return el.view;
  }).filter(function(item) {
    return item;
  })[0];
};

proto.indexOf = function(view) {
  if( !(view instanceof View) ) view = this.get(view);
  var views = $(this.dom()).children().map(function(el) {
    return el.view;
  }).filter(function(item) {
    return item;
  });
  
  return [].indexOf.call(views, view);
};

proto.children = function() {
  return $(this.dom()).children().map(function(el) {
    return el.view;
  }).filter(function(item) {
    return item;
  });
};

proto.selected = function() {
  return this._selected;
};

proto.select = function(id) {
  var self = this;
  var view = id instanceof View ? id : self.get(id);
  if( ~self.indexOf(view) ) self._selected = view;
  return self.validate();
}

proto.validate = function() {
  var self = this;
  var selected = self.selected() || self.get(0);
  var index = self.indexOf(selected);
  var body = self.dom();
  
  if( !~index ) {
    selected = self.get(0);
    index = self.indexOf(selected);
  }
  
  if( ~index ) {
    var selbody = $(body.children[index]);
    
    if( !selbody.hc('active') ) {
      $(self.dom()).children().rc('active');
      selbody.ac('active');
      
      var detail = {prev: self._selected, current:selected};
      self._selected && self._selected.fire('deactivate', detail);
      selected.fire('activate', detail);
      self.fire('change', detail);
      self._selected = selected;
    }
  }
  
  return self;
};

proto.clear = function() {
  var self = this;
  $(self.dom()).empty();
  return self;
};

module.exports = Cards;