var $ = require('tinyselector');
var View = require('../view.js');
var Container = require('../container.js');
var NavItem = require('./navitem.js');

function Navigation(options) {
  View.apply(this, arguments);
}

var proto = Navigation.prototype = Object.create(Container.prototype);

proto.create = function() {
  return $('<div class="xw-navigation">\
    <div class="xw-navigation-title xw-hidden"></div>\
    <ul class="xw-navigation-items"></ul>\
  </div>')[0];
};

proto.init = function(o) {
  var self = this;
  var el = $(self.dom());
  var ul = el.children('ul');
  
  self
  .title(o.title)
  .deselect()
  .group(o.group)
  .multiple(o.multiple === true ? true : false)
  .autocollapse(o.autocollapse === false ? false : true)
  .on('options', function(e) {
    self.title(e.detail.options.title);
  })
  .on('additem', function(e) {
    var item = e.detail.item;
    var index = e.detail.index;
    var view = View.create(item, 'navitem');
    view.dom()._item = item;
    ul.append(view.dom(), index);
  })
  .on('removeitem', function(e) {
    ul.children().each(function() {
      if( e.detail.item === this._item ) $(this).remove();
    });
  });
  
  Container.prototype.init.apply(self, arguments);
};

proto.group = function(group) {
  var o = this.options();
  var el = $(this.dom());
  if( !arguments.length ) return o.group;
  o.group = group;
  
  el.attr('data-navigation-group', group);
  
  return this;
};

proto.multiple = function(multiple) {
  var o = this.options();
  if( !arguments.length ) return o.multiple;
  o.multiple = multiple;
  return this;
};

proto.autocollapse = function(autocollapse) {
  var o = this.options();
  if( !arguments.length ) return o.autocollapse;
  o.autocollapse = autocollapse;
  return this;
};

proto.title = function(title) {
  var o = this.options();
  var el = $(this.dom()).children('.xw-navigation-title');
  if( !arguments.length ) return o.title;
  el.html(title);
  o.title = title;
  
  if( title ) el.rc('xw-hidden');
  else el.ac('xw-hidden');
  return this;
};

proto.selected = function() {
  return this._selected = this._selected || [];
};

proto.deselect = function(id) {
  var self = this;
  var selected = self._selected = self._selected || [];
  selected.forEach(function(node) {
    if( !node ) return;
    if( !id || node === id || node.id === id ) {
      node.active(false);
      node.fire('deselected');
      self.fire('deselected', {node:node});
      selected.splice(selected.indexOf(node), 1);
    }
  });
  return this;
};

proto.collapseall = function() {
  this.findall(NavItem).forEach(function(navitem) {
    navitem.active(false).collapse();
  });
  return this;
};

proto.select = function(id) {
  var self = this;
  if( !id ) return console.warn('required select node(id/instance)') && self;
  
  var node = self.find(id);
  if( !node ) return console.warn('cannot find node for select', id) && self;
  
  var o = self.options();
  var el = $(self.dom());
  var group = self.group();
  var autocollapse = self.autocollapse();
  
  if( !o.multiple ) self.deselect();
  
  if( group ) {
    self.workbench().query('[data-navigation-group="' + group + '"]').forEach(function(node) {
      var view = node.view;
      if( !view || view === self ) return;
      if( typeof view.deselect == 'function' ) {
        view.deselect();
        if( view.autocollapse() ) view.collapseall();
      }
    });
  }
  
  self.findall(NavItem).forEach(function(navitem) {
    if( navitem === node ) navitem.active();
    else if( navitem.dom().contains(node.dom()) ) navitem.expand().active();
    else if( autocollapse ) navitem.collapse().active(false);
  });
  
  if( !~self._selected.indexOf(node) ) {
    self._selected.push(node);
    node.fire('selected');
    self.fire('selected', {node:node});
  }
  return self;
};

View.type('navigation', Navigation);
module.exports = Navigation;
