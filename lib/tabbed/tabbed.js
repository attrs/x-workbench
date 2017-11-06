var $ = require('tinyselector');
var View = require('../view.js');
var Container = require('../container.js');

function Tabbed(options) {
  View.apply(this, arguments);
}

var proto = Tabbed.prototype = Object.create(Container.prototype);

proto.create = function() {
  return $('<div class="xw-tab">\
    <div class="xw-tab-body"></div>\
    <div class="xw-tab-tabs"></div>\
  </div>')[0];
};

proto.init = function(o) {
  var self = this;
  var el = $(self.dom());
  
  self.oneline(o.oneline);
  self.icononly(o.icononly);
  self.titleonly(o.titleonly);
  
  self.on('additem', function(e) {
    var item = e.detail.item;
    var view = View.create(item);
    view.dom()._item = item;
    el.append(view.dom());
    self.validate();
  })
  .on('removeitem', function(e) {
    el.children().each(function() {
      if( e.detail.item === this._item ) $(this).remove();
    });
    
    self.validate();
  });
  
  Container.prototype.init.apply(self, arguments);
  el.attr('flexbox', null);
};

proto.oneline = function(b) {
  var self = this;
  if( !arguments.length ) return $(self.dom()).hc('xw-tab-oneline');
  $(self.dom()).tc('xw-tab-oneline', b);
  return self;
};

proto.icononly = function(b) {
  var self = this;
  if( !arguments.length ) return $(self.dom()).hc('xw-tab-icon-only');
  $(self.dom()).tc('xw-tab-icon-only', b);
  return self;
};

proto.titleonly = function(b) {
  var self = this;
  if( !arguments.length ) return $(self.dom()).hc('xw-tab-title-only');
  $(self.dom()).tc('xw-tab-title-only', b);
  return self;
};

proto.body = function() {
  return $(this.dom()).find('.xw-tab-body')[0];
};

proto.tabs = function() {
  return $(this.dom()).find('.xw-tab-tabs')[0];
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
  var body = $(self.body());
  var tabs = $(self.tabs());
  var title = view.title || 'Untitled';
  var icon = view.icon || '<i class="fa fa-cube"></i>';
  
  if( icon ) icon = '<div class="xw-tab-item-icon">' + icon + '</div>';
  
  var tabbtn = $('<div class="xw-tab-item">').html(icon + title)
  .click(function(e) {
    view.fire('tab', {originalEvent:e});
    self.active(view);
  });
  
  body.append(view.dom(), index);
  tabs.append(tabbtn, index);
  
  return self.validate();
};

proto.remove = function(id) {
  if( !arguments.length ) return View.prototype.remove.call(this);
  
  var self = this;
  var index = self.indexOf(id);
  if( ~index ) {
    $(self.body().children[index]).remove();
    $(self.tabs().children[index]).remove();
  }
  return self.validate();
};

proto.get = function(id) {
  if( !id && id !== 0 ) return null;
  
  var body = this.body();
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
  var views = $(this.body()).children().map(function(el) {
    return el.view;
  }).filter(function(item) {
    return item;
  });
  
  return [].indexOf.call(views, view);
};

proto.children = function() {
  return $(this.body()).children().map(function(el) {
    return el.view;
  }).filter(function(item) {
    return item;
  });
};

proto.selected = function() {
  return this._selected;
};

proto.active = function(id) {
  var self = this;
  var view = id instanceof View ? id : self.get(id);
  if( ~self.indexOf(view) ) self._selected = view;
  return self.validate();
}

proto.validate = function() {
  var self = this;
  var selected = self.selected() || self.get(0);
  var index = self.indexOf(selected);
  var body = self.body();
  var tabs = self.tabs();
  
  if( !~index ) {
    selected = self.get(0);
    index = self.indexOf(selected);
  }
  
  if( ~index ) {
    var selbody = $(body.children[index]);
    var seltab = $(tabs.children[index]);
    
    if( !selbody.hc('active') ) {
      $(self.dom()).find('.xw-tab-body > .active, .xw-tab-tabs > .active').rc('active');
      selbody.ac('active');
      
      var detail = {prev: self._selected, current:selected};
      self._selected && self._selected.fire('deactivate', detail);
      selected.fire('activate', detail);
      self.fire('change', detail);
      self._selected = selected;
    }
    
    if( !seltab.hc('active') ) seltab.ac('active');
  }
  
  if( body.children.length > 1 ) $(tabs).show();
  else $(tabs).hide();
  
  return self;
};

proto.clear = function() {
  var self = this;
  $(self.body()).empty();
  $(self.tabs()).empty();
  return self;
};

View.type('tabbed', Tabbed);
module.exports = Tabbed;