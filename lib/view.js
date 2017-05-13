var $ = require('tinyselector');

function View(options) {
  var self = this;
  
  self.options(options);
  
  var o = self.options();
  var dom = self._dom = self.create();
  
  var el = $(dom).attr('id', o.id).ac('xw-view');
  
  if( o.style ) el.css(o.style);
  if( o.cls ) el.ac(o.cls);
  if( o.flex ) el.attr('flex', o.flex);
  if( o.width ) el.css('width', o.width + 'px');
  if( o.html ) el.html(o.html);
  
  Object.getOwnPropertyNames(o).forEach(function(name) {
    if( !~['on', 'once'].indexOf(name) && !name.indexOf('on') ) {
      if( typeof o[name] == 'function' )
        self.on(name.substring(2), o[name]);
    }
  });
  
  el[0].view = self;
  self._dom = el[0];
}

View.prototype = {
  get title() {
    return this.options().title;
  },
  get id() {
    return $(this.dom()).attr(id);
  },
  get icon() {
    return this.options().icon;
  },
  create: function() {
    return $('<div/>')[0];
  },
  options: function(options) {
    if( !arguments.length ) return this._options;
    this._options = options || {};
    return this;
  },
  dom: function() {
    return this._dom;
  },
  get: function(id) {
    return $(this.dom()).children('#' + id).map(function(el) {
      return el.view;
    }).filter(function(item) {
      return item;
    })[0];
  },
  find: function(id) {
    return $(this.dom()).find('#' + id).map(function(el) {
      return el.view;
    }).filter(function(item) {
      return item;
    })[0];
  },
  query: function(selector) {
    return $(this.dom()).find(selector);
  },
  remove: function() {
    $(this.dom()).remove();
    return this;
  },
  clear: function() {
    $(this.dom()).empty();
    return this;
  },
  html: function(html) {
    $(this.dom()).html(html);
    return this;
  },
  workbench: function() {
    return $(this._dom).parent(function() {
      return this.workbench;
    }, true).map(function(p) {
      return p && p.workbench;
    })[0];
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

var types = {};
types['default'] = View;

View.type = function(name, fn) {
  if( arguments.length <= 1 ) return types[name];
  
  types[name] = fn;
  return this;
};

View.create = function(o) {
  if( !arguments.length ) return new View();
  if( !o ) return console.error('arguments cannot be null');
  if( o instanceof View ) return o;
  
  var Type = o.type ? types[o.type] : types['default'];
  if( !Type ) return console.error('not fount view type: ' + o.type);
  
  return new Type(o);
};

module.exports = View;