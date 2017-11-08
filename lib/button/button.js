var $ = require('tinyselector');
var View = require('../view.js');
var Container = require('../container.js');

function Button(options) {
  View.apply(this, arguments);
}

var proto = Button.prototype = Object.create(Container.prototype);

proto.create = function() {
  return $('<a class="xw-button">\
    <span class="xw-button-icon xw-hidden"></span>\
    <span class="xw-button-text"></span>\
    <span class="xw-button-badge xw-hidden"></span>\
    <span class="xw-button-caret xw-hidden"></span>\
  </a>')[0];
};

proto.body = function() {
  return this.dom().querySelector('.xw-button-text');
};

proto.init = function(o) {
  var self = this;
  var el = $(self.dom());
  var ul = $('<ul class="xw-button-items"></ul>');
  
  self
  .icon(o.icon)
  .text(o.text)
  .link(o.link)
  .target(o.target)
  .badge(o.badge)
  .ddalign(o.ddalign)
  .on('options', function(e) {
    self.icon(e.detail.options.icon);
    self.text(e.detail.options.text);
    self.link(e.detail.options.link);
    self.target(e.detail.options.target);
    self.badge(e.detail.options.badge);
    self.ddalign(e.detail.options.ddalign);
  })
  .on('additem', function(e) {
    var item = e.detail.item;
    var index = e.detail.index;
    var view = View.create(item, 'navitem');
    view.dom()._item = item;
    
    el.find('.xw-button-caret').rc('xw-hidden');
    ul.append(view.dom(), index).appendTo(el);
  })
  .on('removeitem', function(e) {
    ul.children().each(function() {
      if( e.detail.item === this._item ) $(this).remove();
    });
    
    if( !ul.children().length ) {
      el.find('.xw-button-caret').ac('xw-hidden');
      ul.remove();
    }
  })
  .on('click', function() {
    if( el.children('.xw-button-items').length ) {
      self.toggleopen();
    }
  });
  
  $(document).on('click', function(e) {
    if( el[0].contains(e.target) ) return;
    self.open(false);
  });
  
  Container.prototype.init.apply(self, arguments);
};

proto.ddalign = function(ddalign) {
  var o = this.options();
  var el = $(this.dom());
  if( !arguments.length ) return o.ddalign;
  
  ddalign = (ddalign && ddalign.split(' ')) || [];
  el.rc('xw-button-dropdown-right').rc('xw-button-dropdown-center').rc('xw-button-dropdown-up');
  if( ~ddalign.indexOf('right') ) el.ac('xw-button-dropdown-right');
  if( ~ddalign.indexOf('center') ) el.ac('xw-button-dropdown-center');
  if( ~ddalign.indexOf('up') ) el.ac('xw-button-dropdown-up');
  o.ddalign = ddalign.join(' ');
  
  return this;
};

proto.isopen = function() {
  return $(this.dom()).hc('xw-button-open');
};

proto.open = function(b) {
  var self = this;
  var el = $(self.dom());
  if( !arguments.length ) b = true;
  
  if( b ) {
    el.ac('xw-button-open');
  } else {
    el.rc('xw-button-open');
  }
  return self;
};

proto.toggleopen = function() {
  return this.open(!this.isopen());
}

proto.icon = function(icon) {
  var o = this.options();
  var el = $(this.dom()).find('.xw-button-icon');
  if( !arguments.length ) return o.icon;
  el.html(icon);
  o.icon = icon;
  
  if( icon ) el.rc('xw-hidden');
  else el.ac('xw-hidden');
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

proto.text = function(text) {
  var o = this.options();
  var el = $(this.dom()).children('.xw-button-text');
  if( !arguments.length ) return o.text;
  el.html(text);
  o.text = text;
  return this;
};

proto.badge = function(badge) {
  var o = this.options();
  var el = $(this.dom()).find('.xw-button-badge');
  if( !arguments.length ) return o.badge;
  el.html(badge);
  
  o.badge = badge;
  
  if( badge ) el.rc('xw-hidden');
  else el.ac('xw-hidden');
  return this;
};

View.type('button', Button);
module.exports = Button;
