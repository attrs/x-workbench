var $ = require('tinyselector');
var View = require('./view.js');

function Navigation(options) {
  View.apply(this, arguments);
  
  var self = this;
  var o = self.options();
  
  self.items(o.items);
}

var proto = Navigation.prototype = Object.create(View.prototype);

proto.create = function() {
  return $('<ul class="nav xw-navigation"/>')[0];
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
        ' + (item.icon || '<i class="fa fa-cube"></i>') + '\
        <span class="xw-navigation-title">' + item.title + '</span>\
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

proto.add = function(item) {
  if( !item ) return this;
  
  var items = this.items();
  items.push(item);
  
  return this.render();
};

proto.remove = function(id) {
  if( !arguments.length ) return View.prototype.remove.call(this);
  
  var items = this.items();
  var item = items[id];
  
  if( !item ) return this;
  for(var pos;~(pos = items.indexOf(item));) items.splice(pos, 1);
  
  return this.render();
};

proto.get = function(id) {
  return this.items()[id];
};

proto.active = function(id) {
  var item = this.items()[id];
  if( item ) item.active = true;
  return this.render();
};

proto.items = function(items) {
  if( !arguments.length ) return this._items = this._items || [];
  
  this._items = items || [];
  return this.render();
};

proto.clear = function() {
  this._items = [];
  return this.render();
};

module.exports = Navigation;