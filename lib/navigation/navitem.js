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
        <div class="xw-navitem-acc">\
          <span class="xw-navitem-badge"></span>\
        </div>\
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
  .badge(o.badge)
  .on('matchstate', function(e) {
    self.select();
  })
  .on('options', function(e) {
    self.text(e.detail.options.text);
    self.icon(e.detail.options.icon);
    self.link(e.detail.options.link);
    self.badge(e.detail.options.badge);
  })
  .on('additem', function(e) {
    var item = e.detail.item;
    var index = e.detail.index;
    var view = View.create(item, 'navitem');
    var ul = el.children('ul');
    view.dom()._item = item;
    
    if( !ul.length ) {
      el.children('a').children('.xw-navitem-acc')
      .append('<span class="xw-navitem-caret">');
      
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
  .on('click', function(e) {
    self.toggle().select();
  });
  
  Container.prototype.init.apply(self, arguments);
};

proto.isexpand = function() {
  return $(this.dom()).hc('xw-navitem-expand');
};

proto.expand = function() {
  $(this.dom()).ac('xw-navitem-expand');
  return this;
};

proto.collapse = function() {
  $(this.dom()).rc('xw-navitem-expand');
  return this;
};

proto.toggle = function() {
  var self = this;
  if( self.isexpand() ) self.collapse();
  else self.expand();
  return self;
};

proto.text = function(text) {
  var self = this;
  var o = self.options();
  var el = $(self.dom()).find('.xw-navitem-text');
  if( !arguments.length ) return o.text;
  el.html(text);
  o.text = text;
  return self;
};

proto.badge = function(badge) {
  var self = this;
  var o = self.options();
  var el = $(self.dom()).find('.xw-navitem-badge');
  if( !arguments.length ) return o.badge;
  el.html(badge);
  
  if( badge ) el.css('opacity', 1);
  else el.css('opacity', 0);
  o.badge = badge;
  return self;
};

proto.icon = function(icon) {
  var self = this;
  var o = self.options();
  var el = $(self.dom()).find('.xw-navitem-icon');
  if( !arguments.length ) return o.icon;
  el.html(icon);
  o.icon = icon;
  return self;
};

proto.link = function(link) {
  var self = this;
  var o = self.options();
  var el = $(self.dom()).children('a');
  if( !arguments.length ) return o.link;
  el.attr('href', link || 'javascript:;');
  o.link = link;
  return self;
};

proto.target = function(target) {
  var self = this;
  var o = self.options();
  var el = $(self.dom()).children('a');
  if( !arguments.length ) return o.target;
  el.attr('target', target);
  o.target = target;
  return self;
};

proto.isactive = function() {
  return $(this.dom()).hc('xw-navitem-active');
};

proto.active = function(b) {
  var self = this;
  var el = $(self.dom());
  if( !arguments.length ) b = true;
  if( b ) el.ac('xw-navitem-active');
  else el.rc('xw-navitem-active');
  return this;
};

// with navigation
proto.navigation = function() {
  return $(this.dom()).parent(function() {
    return this.view && $(this).hc('xw-navigation');
  }).map(function(p) {
    return p && p.view;
  })[0];
};

proto.isselected = function() {
  var self = this;
  var navigation = self.navigation();
  return ~navigation.selected().indexOf(self) ? true : false;
};

proto.select = function() {
  var self = this;
  var navigation = self.navigation();
  if( navigation ) navigation.select(self);
  return self;
};


View.type('navitem', NavItem);
module.exports = NavItem;

