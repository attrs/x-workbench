var $ = require('tinyselector');

function View(options) {
  this.options(options);
  
  var o = this.options();
  var dom = this._dom = this.create();
  
  var el = $(dom).attr('id', o.id).ac('xw-view');
  
  if( o.style ) el.css(o.style);
  if( o.cls ) el.ac(o.cls);
  if( o.flex ) el.attr('flex', o.flex);
  if( o.width ) el.css('width', o.width + 'px');
  if( o.html ) el.html(o.html);
  
  el[0].view = this;
  this._dom = el[0];
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
  workbench: function() {
    return $(this._dom).parent(function() {
      return this.workbench;
    }, true).map(function(p) {
      return p && p.workbench;
    })[0];
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