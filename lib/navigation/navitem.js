var $ = require('tinyselector');
var View = require('../view.js');
var Container = require('../container.js');

function NavItem(options) {
  View.apply(this, arguments);
}

var proto = NavItem.prototype = Object.create(Container.prototype);

proto.create = function() {
  return $('<li class="xw-navitem">\
      <a href="javascript:;">\
        <span class="xw-navitem-icon"></span>\
        <span class="xw-navitem-text"></span>\
      </a>\
  </li>')[0];
};

proto.init = function(o) {
  var self = this;
  var el = $(self.dom());
  
  self
  .text(o.text)
  .icon(o.icon)
  .link(o.link)
  .on('options', function(e) {
    self.text(e.detail.options.text);
    self.icon(e.detail.options.icon);
    self.link(e.detail.options.link);
  })
  .on('additem', function(e) {
    var item = e.detail.item;
    var index = e.detail.index;
    var view = View.create(item, 'navitem');
    var ul = el.children('ul');
    view.dom()._item = item;
    
    if( !ul.length ) {
      el.children('a')
      .append('<i class="xw-navitem-caret">')
      .on('click', function() {
        self.toggle();
      });
      
      ul = el.append('<ul class="xw-navitem-items">').children('ul');
    }
    
    ul.append(view.dom(), index);
  })
  .on('removeitem', function(e) {
    ul.children().each(function() {
      if( e.detail.item === this._item ) $(this).remove();
    });
  });
  
  el.children('a')
  .on('click', function() {
    self.select();
  });
  
  Container.prototype.init.apply(self, arguments);
};

proto.open = function() {
  $(this.dom()).ac('xw-navitem-open');
  return this;
};

proto.close = function() {
  $(this.dom()).rc('xw-navitem-open');
  return this;
};

proto.toggle = function() {
  var dom = $(this.dom());
  if( dom.hc('xw-navitem-open') ) dom.rc('xw-navitem-open');
  else dom.ac('xw-navitem-open');
  return this;
};

proto.text = function(text) {
  var o = this.options();
  var el = $(this.dom()).find('.xw-navitem-text');
  if( !arguments.length ) return o.text;
  el.html(text);
  o.text = text;
  return this;
};

proto.icon = function(icon) {
  var o = this.options();
  var el = $(this.dom()).find('.xw-navitem-icon');
  if( !arguments.length ) return o.icon;
  el.html(icon);
  o.icon = icon;
  return this;
};

proto.link = function(link) {
  var o = this.options();
  var el = $(this.dom()).children('a');
  if( !arguments.length ) return o.link;
  el.attr('href', link || 'javascript:;');
  o.link = link;
  return this;
};

proto.target = function(target) {
  var o = this.options();
  var el = $(this.dom()).children('a');
  if( !arguments.length ) return o.target;
  el.attr('target', target);
  o.target = target;
  return this;
};

proto.navigation = function() {
  return $(this.dom()).parent(function() {
    return this.view && $(this).hc('xw-navigation');
  }).map(function(p) {
    return p && p.view;
  })[0];
};

proto.isselected = function() {
  return $(this.dom()).hc('xw-navitem-selected');
};

proto.active = function(b) {
  if( !arguments.length ) b = true;
  $(this.dom()).tc('xw-navitem-active', b);
  return this;
};

proto.select = function() {
  var self = this;
  var navigation = this.navigation();
  $(navigation.dom()).find('.xw-navitem-selected').rc('xw-navitem-selected');
  $(navigation.dom()).find('.xw-navitem-active').rc('xw-navitem-active');
  $(self.dom()).ac('xw-navitem-selected').parent(function() {
    var view = this.view;
    if( view === self ) return view.active() && false;
    if( view && view instanceof NavItem ) view.active().open();
    return $(this).hc('xw-navigation');
  });
  
  return self;
};


View.type('navitem', NavItem);
module.exports = NavItem;

