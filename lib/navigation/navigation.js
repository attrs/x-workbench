var $ = require('tinyselector');
var View = require('../view.js');

function Navigation(options) {
  View.apply(this, arguments);
  
  var self = this;
  var o = self.options();
  
  self.items(o.items);
}

var proto = Navigation.prototype = Object.create(View.prototype);

proto.create = function() {
  return $('<ul class="xw-navigation"/>')[0];
};

proto.render = function() {
  var el = $(this.dom()).empty();
  var self = this;
  
  this.items().forEach(function(item) {
    var li;
    
    if( item.label ) {
      li = $('<li class="xw-navigation-label pt15">' + item.label + '</li>');
    } else if( item.title ) {
      li = $('<li>\
      <a href="' + (item.href || 'javascript:;') + '">\
        ' + (item.icon || '') + (item.title || 'Untitled') + '\
      </a>\
      </li>');
    }
    
    if( li ) {
      if( item.active ) li.ac('active');
      li.id = item.id;
      li.find('a').click(function(e) {
        el.find('li').rc('active');
        li.ac('active');
        item.onclick && item.onclick(e);
      });
      el.append(li);
    }
  });
  return this;
};

proto.add = function(item, index) {
  if( !item ) return this;
  
  if( index >= 0 ) this.items().splice(index, 0, item);
  else this.items().push(item);
  
  return this.render();
};

proto.indexOf = function(item) {
  if( !item ) return -1;
  if( typeof item !== 'object' ) item = this.get(item);
  return this.items().indexOf(item);
};

proto.remove = function(id) {
  if( !arguments.length ) return View.prototype.remove.call(this);
  var item = this.get(id);
  if( !item ) return this;
  for(var pos;~(pos = items.indexOf(item));) items.splice(pos, 1);
  return this.render();
};

proto.get = function(id) {
  var items = this.items();
  if( typeof id == 'number' ) return items[id];
  
  return items.filter(function(item) {
    return item.id == id;
  })[0];
};

proto.select = function(id) {
  this.items().forEach(function(item, index) {
    if( item.id == id || index === id ) item.active = true;
    else item.active = false;
  });
  
  return this.render();
};

proto.active = function() {
  console.warn('Navation.active(id) is deprecated, use Navation.select(id) instead');
  return proto.select.apply(this, arguments);
};

proto.items = function(items) {
  if( !arguments.length ) return this._items = this._items || [];
  items = this._items = items || [];
  return this.render();
};

proto.clear = function() {
  this.items(null);
  return this.render();
};

module.exports = Navigation;