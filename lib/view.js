var $ = require('tinyselector');

function View(options) {
  var self = this;
  var o = self._options = options || {};
  var dom = self._dom = self.create(o);
  $(dom).attr('id', o.id).ac('xw-view');
  dom.view = self;
  self.init(o);
  if( o.hidden ) this.hide(o);
}

View.prototype = {
  get id() {
    return $(this.dom()).attr('id');
  },
  init: function(o) {
    var self = this;
    var dom = self.dom();
    var el = $(dom);
    
    if( o.style ) el.css(o.style);
    if( o.cls ) el.ac(o.cls);
    if( o.flexbox ) el.attr('flexbox', o.flexbox);
    if( o.flex ) el.attr('flex', o.flex);
    if( o.width ) {
      if( typeof +o.width == 'number' ) el.css('width', o.width + 'px');
      else if( typeof o.width == 'string' ) el.css('width', o.width);
    }
    if( o.height ) {
      if( typeof +o.width == 'number' ) el.css('width', o.width + 'px');
      else if( typeof o.width == 'string' ) el.css('width', o.width);
    }
    if( o.html ) self.html(o.html);
    
    Object.getOwnPropertyNames(o).forEach(function(name) {
      if( !~['on', 'once'].indexOf(name) && !name.indexOf('on') ) {
        if( typeof o[name] == 'function' )
          self.on(name.substring(2), o[name]);
      }
    });
  },
  create: function(o) {
    return $('<div/>')[0];
  },
  options: function(options) {
    var self = this;
    if( !arguments.length ) return self._options;
    self._options = options || {};
    self.fire('options', {options:options});
    return self;
  },
  dom: function() {
    return this._dom;
  },
  body: function() {
    return this._dom;
  },
  html: function(html) {
    var self = this;
    var el = $(self.body());
    if( !arguments.length ) return el.html();
    el.html(html);
    return self;
  },
  findview: function(selector) {
    var nodes = $(this.dom()).find(selector);
    if( !nodes.length ) return null;
    
    var node = nodes[0];
    if( node.view ) return node.view;
    var parent = $(node).parent('.xw-view')[0];
    return parent && parent.view;
  },
  find: function(id) {
    if( id instanceof View ) return id;
    if( typeof id == 'string' ) {
      var node = this.dom().querySelector('#' + id + '.xw-view');
      return node && node.view;
    }
    return this.findall(id)[0];
  },
  findall: function(id) {
    var el = $(this.dom());
    if( typeof id == 'string' ) els = el.find('#' + id + '.xw-view');
    else els = el.find('.xw-view');
    
    return els.map(function(node) {
      if( typeof id == 'string' ) return node.view;
      if( typeof id == 'function' ) return (node.view instanceof id) && node.view;
    }).filter(function(item) {
      return item;
    });
  },
  query: function(selector) {
    return $(this.dom()).find(selector);
  },
  remove: function() {
    var self = this;
    $(self.dom()).remove();
    self.fire('remove');
    return self;
  },
  clear: function() {
    var self = this;
    $(self.body()).empty();
    self.fire('clear');
    return self;
  },
  workbench: function() {
    var self = this;
    return $(self.dom()).parent(function() {
      return this.workbench;
    }, true).map(function(p) {
      return p && p.workbench;
    })[0];
  },
  data: function(data) {
    var self = this;
    if( !arguments.length ) return self._data;
    self._data = data;
    self.fire('data', {data:data});
    return self;
  },
  show: function() {
    $(this.dom()).css('display', '');
    return this;
  },
  hide: function() {
    $(this.dom()).css('display', 'none');
    return this;
  },
  fire: function(type, detail, cancellable, bubble) {
    return !!$(this.dom()).fire(type, detail, cancellable, bubble)[0];
  },
  on: function(type, fn) {
    var self = this;
    fn._wrapper = function() {
      return fn.apply(self, arguments);
    };
    
    $(this.dom()).on(type, fn._wrapper);
    return this;
  },
  once: function(type, fn) {
    var self = this;
    fn._wrapper = function() {
      return fn.apply(self, arguments);
    };
    
    $(this.dom()).once(type, fn._wrapper);
    return this;
  },
  off: function(type, fn) {
    $(this.dom()).off(type, fn._wrapper || fn);
    return this;
  }
};

function Separator(options) {
  View.apply(this, arguments);
}

Separator.prototype = Object.create(View.prototype, {
  create: {
    value: function() {
      return $('<div class="xw-separator" />')[0];
    }
  }
});

var types = {};
types['default'] = View;

View.type = function(name, fn) {
  if( arguments.length <= 1 ) return types[name];
  
  types[name] = fn;
  return this;
};

View.create = function(o, deftype) {
  if( !arguments.length ) return new View();
  if( !o ) return console.error('arguments cannot be null');
  if( o instanceof View ) return o;
  if( o === '-' ) return new Separator();
  
  var Type = o.type ? types[o.type] : types[deftype || 'default'];
  if( !Type ) return console.error('not fount view type: ' + (o.type || deftype));
  
  return new Type(o);
};

View.type('separator', Separator);
View.type('view', View);
module.exports = View;