/*!
* x-workbench
* https://attrs.github.io/x-workbench/
*
* Copyright attrs and others
* Released under the MIT license
* https://github.com/attrs/x-workbench/blob/master/LICENSE
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Workbench", [], factory);
	else if(typeof exports === 'object')
		exports["Workbench"] = factory();
	else
		root["Workbench"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Context = __webpack_require__(15);

__webpack_require__(16)(Context);

var def = Context(document);
var lib = module.exports = function(doc) {
  if( doc instanceof Document ) {
    if( doc === document ) return def(doc);
    return doc.__tinyselector__ = doc.__tinyselector__ || Context(doc);
  }
  
  return def.apply(def, arguments);
};

lib.fn = Context.fn;
lib.util = Context.util;
lib.each = Context.each;
lib.create = Context.create;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);

function View(options) {
  var self = this;
  
  var o = self._options = options || {};
  var dom = self._dom = self.create(o);
  $(dom).attr('id', o.id).ac('xw-view');
  dom.view = self;
  self.init(o);
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
    $(this.dom()).show();
    return this;
  },
  hide: function() {
    $(this.dom()).hide();
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);

function Container(options) {
  var self = this;
  View.apply(self, arguments);
}

var proto = Container.prototype = Object.create(View.prototype);

proto.init = function(options) {
  View.prototype.init.apply(this, arguments);
  this.items(options.items);
};

proto.additem = function(o, index) {
  var self = this;
  var items = self.items();
  
  if( !Array.isArray(o) ) o = [o];
  
  o.forEach(function(item) {
    if( !item ) return;
    
    if( index >= 0 ) items.splice(index, 0, item);
    else items.push(item);
    self.fire('additem', {item:item, index: index});
  });
  
  return self;
};

proto.getitem = function(id) {
  var items = this.items();
  if( typeof id == 'number' ) return items[id];
  
  return items.filter(function(item) {
    return item && (item.id === id || item === id);
  })[0];
};

proto.items = function(items) {
  var self = this;
  if( !arguments.length ) return self._items;
  
  self._items = self._items || [];
  self.clearitems().additem(items);
  return self;
};

proto.clearitems = function() {
  var self = this;
  self.items().forEach(function(item) {
    self.removeitem(item);
  });
  return self;
};

proto.clear = function() {
  var self = this;
  self.clearitems();
  View.prototype.clear.call(self);
  return self;
};

proto.removeitem = function(id) {
  var self = this;
  if( !arguments.length ) return View.prototype.remove.call(self);
  
  var items = self.items();
  var item = self.getitem(id);
  var index = items.indexOf(item);
  if( ~index ) items.splice(index, 1);
  self.fire('removeitem', {item:item});
  return self;
};

module.exports = Container;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);

function Anchor(options) {
  View.apply(this, arguments);
}

var proto = Anchor.prototype = Object.create(View.prototype);

proto.create = function() {
  return $('<a href="javascript:;" class="xw-anchor">')[0];
};

proto.init = function(o) {
  View.prototype.init.apply(this, arguments);
  this.update();
};

proto.update = function() {
  var o = this.options();
  
  this.text(o.text).href(o.href).target(o.target);
};

proto.text = function(text) {
  var o = this.options();
  var el = $(this.dom());
  if( !arguments.length ) return o.text;
  el.html(text);
  o.text = text;
  return this;
};

proto.href = function(href) {
  var o = this.options();
  var el = $(this.dom());
  if( !arguments.length ) return o.href;
  el.attr('href', href || 'javascript:;');
  o.href = href;
  return this;
};

proto.target = function(target) {
  var o = this.options();
  var el = $(this.dom());
  if( !arguments.length ) return o.target;
  el.attr('target', target);
  o.target = target;
  return this;
};

View.type('anchor', Anchor);
module.exports = Anchor;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var matches = Element.prototype.matches || 
  Element.prototype.matchesSelector || 
  Element.prototype.mozMatchesSelector ||
  Element.prototype.msMatchesSelector || 
  Element.prototype.oMatchesSelector || 
  Element.prototype.webkitMatchesSelector ||
  function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
  };

var lib = module.exports = {
  isNull: function(value) {
    return value === null || value === undefined;
  },
  isArrayLike: function(o) {
    var type = typeof o;
    if( !o || type == 'string' || type != 'object' || o === window || typeof o.length != 'number' ) return false;
    if( o instanceof Array || (Array.isArray && Array.isArray(o)) ) return true;
    
    var str = Object.prototype.toString.call(o);
    return /^\[object (HTMLCollection|NodeList|Array|FileList|Arguments)\]$/.test(str);
  },
  create: function(html) {
    if( !html || typeof html != 'string' ) return null;
    var div = document.createElement('div');
    div.innerHTML = html.trim();
    
    var arr = [];
    [].forEach.call(div.childNodes, function(node) {
      var p = node.parentNode;
      p && p.removeChild(node);
      arr.push(node);
    });
    
    return arr;
  },
  accessor: function(el) {
    var tag = el.tagName.toLowerCase();
    var id = el.id;
    var cls = el.className.split(' ').join('.');
    id = id ? ('#' + id) : '';
    cls = cls ? ('.' + cls) : '';
    
    return tag + id + cls;
  },
  assemble: function(selector) {
    if( !selector || typeof(selector) !== 'string' ) return console.error('invalid selector', selector);
    
    var arr = selector.split(':');
    var accessor = arr[0];
    var pseudo = arr[1];
    
    arr = accessor.split('.');
    var tag = arr[0];
    var id;
    var classes = arr.splice(1).join(' ').trim();
    
    if( ~tag.indexOf('#') ) {
      var t = tag.split('#');
      tag = t[0];
      id = t[1];
    }
    
    return {
      selector: selector,
      accessor: accessor,
      tag: tag && tag.toLowerCase() || '',
      id: id || '',
      classes: classes || '',
      pseudo: pseudo || ''
    };
  },
  isHTML: function(html) {
    return (typeof html === 'string' && html.match(/(<([^>]+)>)/ig) ) ? true : false;
  },
  matches: function(el, selector) {
    try {
      if( typeof selector == 'function' )
        return !!selector.call(el);
      
      return !!(el && matches.call(el, selector));
    } catch(e) {
      return false;
    }
  },
  each: function(arr, fn, force) {
    if( !arr ) return arr;
    if( !lib.isArrayLike(arr) ) arr = [arr];
    [].every.call(arr, function(item) {
      if( force !== true && (item === null || item === undefined) ) return false;
      return ( fn && fn.apply(item, [arr.indexOf(item), item]) === false ) ? false : true;
    });
    return arr;
  },
  chunk: function(arr, size) {
    return [].concat.apply([],
      arr.map(function(item,i) {
        return i % size ? [] : [arr.slice(i, i + size)];
      })
    );
  },
  async: function(arr, iterator, done) {
    if( arr && !lib.isArrayLike(arr) ) arr = [arr];
    
    if( !arr || !arr.length || typeof iterator != 'function' ) {
      done && done.call(arr);
      return arr;
    }
    
    var index = 0;
    var next = function() {
      iterator.call(arr, arr[index], function(err) {
        if( err ) return done && done.call(arr, err);
        
        ++index;
        if( index >= arr.length ) done && done.call(arr);
        else setImmediate(next);
      });
    };
    next();
    
    return arr;
  },
  offset: function(el, abs) {
    if( !el || typeof el.offsetTop != 'number' ) return {top:null,left:null};
    
    var top = el.offsetTop, left = el.offsetLeft;
    if( abs ) {
      while( el = el.offsetParent ) {
        if( !el || el.tagName === 'BODY' ) break;
        top += el.offsetTop - (el.scrollTop || 0);
        left += el.offsetLeft - (el.scrollLeft || 0);
      }
    }
    
    return {
      top: top,
      left: left
    };
  },
  isElement: function(o) {
    return (
      typeof HTMLElement === 'object' ? o instanceof HTMLElement : 
      o && typeof o === 'object' && o.nodeType === 1 && typeof o.nodeName === 'string'
    );
  },
  isNode: function(o) {
    return (
      typeof Node === "object" ? o instanceof Node : 
      o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
  },
  computed: function(el, name) {
    return window.getComputedStyle(el, null);
  },
  number: function(o) {
    if( !o || typeof o == 'number' ) return o;
    
    o = o + '';
    (['px', 'em', 'pt', '%', 'in', 'deg'].every(function(c) {
      if( o.endsWith(c) ) {
        o = o.split(c).join('');
        return false;
      }
      return true;
    }));
    return +o;
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);
var Container = __webpack_require__(2);

function Block(options) {
  Container.apply(this, arguments);
}

var proto = Block.prototype = Object.create(Container.prototype);

proto.create = function(o) {
  return $('<div class="xw-block"></div>')[0];
};

proto.init = function(o) {
  var self = this;
  var el = $(self.dom());
  
  self.on('additem', function(e) {
    var item = e.detail.item;
    var index = e.detail.index;
    var view = View.create(item);
    view.dom()._item = item;
    el.append(view.dom(), index);
  })
  .on('removeitem', function(e) {
    el.children().each(function() {
      if( e.detail.item === this._item ) $(this).remove();
    });
  });
  
  Container.prototype.init.apply(self, arguments);
};

View.type('block', Block);
module.exports = Block;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);
var Container = __webpack_require__(2);

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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);
var Container = __webpack_require__(2);

function Cards(options) {
  View.apply(this, arguments);
}

var proto = Cards.prototype = Object.create(Container.prototype);

proto.create = function() {
  return $('<div class="xw-cards"></div>')[0];
};

proto.init = function(o) {
  var self = this;
  var el = $(self.dom());
  
  self.on('additem', function(e) {
    var item = e.detail.item;
    var view = View.create(item);
    view.dom()._item = item;
    el.append(view.dom());
    self.update();
  })
  .on('removeitem', function(e) {
    el.children().each(function() {
      if( e.detail.item === this._item ) $(this).remove();
    });
    self.update();
  });
  
  Container.prototype.init.apply(self, arguments);
};

proto.selected = function() {
  return this._selected;
};

proto.select = function(id) {
  var self = this;
  var item = self.getitem(id);
  if( item ) self._selected = item;
  return self.update();
};

proto.update = function() {
  var self = this;
  if( !self.items().length ) return this;
  
  var el = $(self.dom());
  var selected = self.selected() || self.getitem(0);
  
  el.children().each(function() {
    var cdom = this;
    var cel = $(this);
    var cview = this.view;
    var citem = this._item;
    if( citem === selected ) {
      if( !cel.hc('active') ) {
        cel.ac('active');
        cview && cview.fire('activate', { container: self });
        self.fire('select', { selected: citem, view: cview });
      }
    } else {
      if( cel.hc('active') ) {
        cel.rc('active');
        cview && cview.fire('deactivate', { container:self });
      }
    }
  });
  
  return self;
};

View.type('cards', Cards);
module.exports = Cards;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);

function Label(options) {
  View.apply(this, arguments);
}

var proto = Label.prototype = Object.create(View.prototype);

proto.create = function() {
  return $('<div class="xw-label"></div>')[0];
};

module.exports = Label;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);
var Container = __webpack_require__(2);
var NavItem = __webpack_require__(17);

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
    navitem.collapse();
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
    else if( navitem.dom().contains(node.dom()) ) navitem.expand();
    else if( autocollapse ) navitem.collapse();
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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
  target: 'page',
  view: {
    flexbox: 'vertical',
    flex: 1,
    items: [
      {
        id: 'topbar',
        cls: 'xw-dashboard-topbar',
        style: {
          '-webkit-app-region': 'drag'
        },
        flexbox: 'horizontal',
        items: [
          {
            id: 'logo',
            cls: 'xw-logo',
            width: 250
          }, {
            id: 'topnav',
            flex: 1,
            flexbox: 'horizontal',
            items: [
              {
                id: 'topnav-left',
                type: 'toolbar'
              }, {
                id: 'topnav-right',
                type: 'toolbar',
                flex: 1,
                style: {
                  'text-align': 'right'
                }
              }
            ]
          }
        ]
      }, {
        id: 'center',
        flexbox: 'horizontal',
        flex: 1,
        items: [
          {
            id: 'sidebar-wrapper',
            flexbox: 'vertical',
            cls: 'xw-dashboard-sidebar xw-dark',
            width: 250,
            items: [
              {
                id: 'sidebar',
                type: 'block'
              }
            ]
          }, {
            id: 'page',
            cls: 'xw-page',
            flex: 1
          }
        ]
      }
    ]
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
  view: {
    flexbox: 'vertical',
    flex: 1
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);
var Anchor = __webpack_require__(3);

function Profile(options) {
  View.apply(this, arguments);
}

var proto = Profile.prototype = Object.create(View.prototype);

proto.create = function() {
  return $('<div class="xw-profile">\
    <div class="xw-profile-image xw-hidden">\
      <div class="xw-profile-image-body"></div>\
    </div>\
    <div class="xw-profile-body">\
      <div class="xw-profile-links">\
      </div>\
      <div class="xw-profile-text">\
        Text\
      </div>\
    </div>\
  </div>')[0];
};

proto.body = function() {
  return this.dom().querySelector('.xw-profile-text');
};

proto.init = function(o) {
  View.prototype.init.apply(this, arguments);
  this.update();
};

proto.update = function() {
  var o = this.options();
  
  this
  .text(o.text)
  .image(o.image)
  .links(o.links);
};

proto.text = function(text) {
  var o = this.options();
  var el = $(this.dom()).find('.xw-profile-text');
  if( !arguments.length ) return o.text;
  el.html(text);
  o.text = text;
  return this;
};

proto.image = function(image) {
  var o = this.options();
  var el = $(this.dom()).children('.xw-profile-image');
  if( !arguments.length ) return o.image;
  
  el.children('.xw-profile-image-body').css('background-image', 'url(' + image + ')');
  
  if( image ) el.rc('xw-hidden');
  else el.ac('xw-hidden');
  
  o.image = image;
  return this;
};

proto.links = function(links) {
  var o = this.options();
  var el = $(this.dom()).find('.xw-profile-links');
  if( !arguments.length ) return o.links;
  if( links && !Array.isArray(links)) links = [links];
  
  el.empty();
  
  links && links.forEach(function(link) {
    if( typeof link == 'string' ) link = {text:link};
    if( typeof link != 'object' ) return;
    
    el.append(new Anchor(link).dom());
  });
  
  o.links = links;
  return this;
};

View.type('profile', Profile);
module.exports = Profile;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);
var Container = __webpack_require__(2);

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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);
var Container = __webpack_require__(2);

function Toolbar(options) {
  Container.apply(this, arguments);
}

var proto = Toolbar.prototype = Object.create(Container.prototype);

proto.create = function(o) {
  return $('<div class="xw-toolbar"></div>')[0];
};

proto.init = function(o) {
  var self = this;
  var el = $(self.dom());
  
  self.on('additem', function(e) {
    var item = e.detail.item;
    var index = e.detail.index;
    var view = View.create(item, 'button');
    view.dom()._item = item;
    el.append(view.dom(), index);
  })
  .on('removeitem', function(e) {
    el.children().each(function() {
      if( e.detail.item === this._item ) $(this).remove();
    });
  });
  
  Container.prototype.init.apply(self, arguments);
};

View.type('toolbar', Toolbar);
module.exports = Toolbar;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var win = window;
var Extensions = function() {}
Extensions.prototype = new Array();
var extensions = new Extensions();

var util = __webpack_require__(4);
var isArrayLike = util.isArrayLike;
var create = util.create;
var isHTML = util.isHTML;
var each = util.each;

var Context = function(document) {
  if( !document ) {
    var cs = (win.currentScript || win._currentScript);
    document = (cs && cs.ownerDocument) || win.document;
  }
  
  var Selection = function(selector) {
    if( typeof selector == 'string' ) {
      if( isHTML(selector) ) {
        selector = create(selector);
      } else {
        selector = document.querySelectorAll(selector);
      }
    }
    
    if( selector ) {
      var self = this;
      if( selector instanceof Extensions ) {
        return selector;
      //} else if( isNode(selector) && selector.nodeType == 11 ) {
      } else if( isArrayLike(selector) ) {
        [].forEach.call(selector, function(el) {
          self.push(el);
        });
      } else {
        this.push(selector);
      }
    }
  };
  
  var Selector = function(selector) {
    return new Selection(selector);
  };
  
  Selector.ready = function(fn) {
    if( document.body ) return fn.call(this, Selector);
    
    document.addEventListener('DOMContentLoaded', function() {
      fn(Selector);
    });
  };
  
  Selector.fn = extensions;
  Selector.util = util;
  Selector.create = create;
  Selector.each = each;
  Selection.prototype = extensions;
  Selection.prototype.document = document;
  Selection.prototype.Selection = Selection;
  Selection.prototype.$ = Selector;
  
  return Selector;
}

Context.fn = extensions;
Context.util = util;
Context.create = create;
Context.each = each;

module.exports = Context;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(4);
var win = window;
var doc = document;

(function () {
  if ( typeof win.CustomEvent === "function" ) return false;
  
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = doc.createEvent('CustomEvent');
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }
  
  CustomEvent.prototype = win.Event.prototype;
  win.CustomEvent = CustomEvent;
})();

module.exports = function(ctx) {
  var fn = ctx.fn;
  var create = util.create;
  var isHTML = util.isHTML;
  var isNode = util.isNode;
  var isElement = util.isElement;
  var isArrayLike = util.isArrayLike;
  var isNull = util.isNull;
  var matches = util.matches;
  var each = util.each;
  var async = util.async;
  var offset = util.offset;
  var computed = util.computed;
  var number = util.number;
  
  fn.ready = function(fn) {
    this.each(function() {
      if( this instanceof Document ) {
        if( this.body ) return fn.call(this, ctx(this));
        
        this.addEventListener('DOMContentLoaded', function() {
          fn.call(this, ctx(this));
        });
      }
    });
    return this;
  };
  
  fn.each = function(fn, force) {
    return each(this, fn, force);
  };
  
  fn.chunk = function(size) {
    return chunk(this, size);
  };
  
  fn.index = function(item) {
    return this.indexOf(item);
  };
  
  fn.add = function(arr) {
    if( !arr ) return;
    if( !isArrayLike(arr) ) arr = [arr];
    
    var self = this;
    [].forEach.call(arr, function(item) {
      if( item ) self.push(item);
    });
    return this;
  };
  
  fn.remove = function(item, once) {
    if( typeof item === 'number' ) item = this[item];
    for(var index;(index = this.indexOf(item)) >= 0;) {
      this.splice(index, 1);
      if( once ) break;
    }
    return this;
  };
  
  fn.reverse = function() {
    [].reverse.call(this);
    return this;
  };
  
  fn.clear = function() {
    var len = this.length;
    if( len > 0 ) {
      for(var i=0; i < len; i++) delete this[i];
      this.length = 0;
    }
    
    return this;
  };
  
  fn.get = function(index) {
    return this[index];
  };
  
  fn.find = function(selector) {
    var nodes = this.$();
    this.each(function() {
      if( !this.querySelectorAll ) return;
      [].forEach.call(this.querySelectorAll(selector), function(node) {
        if( !~nodes.indexOf(node) ) nodes.push(node);
      });
    });
    return nodes;
  };
  
  fn.empty = function() {
    return this.each(function() {
      this.innerHTML = '';
    });
  };
  
  fn.html = function(html) {
    if( !arguments.length ) return this[0] && this[0].innerHTML;
    
    return this.each(function() {
      this.innerHTML = html || '';
    });
  };
  
  fn.outer = function(html) {
    if( !arguments.length ) return this[0] && this[0].outerHTML;
    
    return this.each(function() {
      this.outerHTML = html || '';
    });
  };
  
  fn.text = function(text) {
    if( !arguments.length ) return (this[0] && (this[0].textContent || this[0].innerText)) || '';
    
    return this.each(function() {
      this.innerText = text || '';
    });
  };
  
  fn.attr = function(key, value) {
    if( !arguments.length ) return null;
    if( typeof key == 'object' ) {
      for(var k in key) this.attr(k, key[k]);
      return this;
    }
    if( arguments.length === 1 ) return this[0] && this[0].getAttribute && this[0].getAttribute(key);
    
    return this.each(function() {
      if( value === null || value === undefined ) this.removeAttribute(key);
      else this.setAttribute(key, value + '');
    });
  };
  
  fn.hasAttr = fn.ha = function(name) {
    return this[0] && this[0].hasAttribute(name);
  };
  
  fn.css = function(key, value) {
    if( !arguments.length ) return this;
    if( arguments.length === 1 ) {
      if( typeof key == 'string' ) return this[0] && this[0].style && this[0].style[key];
      for(var k in key) this.css(k, key[k]);
      return this;
    }
    
    return this.each(function() {
      if( isNull(value) ) this.style[key] = null;
      else this.style[key] = value;
    });
  };
  
  fn.addClass = fn.ac = function(cls) {
    if( typeof cls == 'string' ) cls = cls.split(' ');
    if( !isArrayLike(cls) || !cls.length ) return this;
    
    return this.each(function() {
      if( 'className' in this ) {
        var ocls = this.className.trim().split(' ');
        [].forEach.call(cls, function(cls) {
          if( isNull(cls) ) return;
          if( !~ocls.indexOf(cls) ) ocls.push(cls);
        });
        this.className = ocls.join(' ').trim();
      }
    });
  };
  
  fn.removeClass = fn.rc = function(cls) {
    if( typeof cls == 'string' ) cls = cls.split(' ');
    if( !isArrayLike(cls) || !cls.length ) return this;
    
    return this.each(function() {
      if( 'className' in this ) {
        var ocls = this.className.trim().split(' ');
        [].forEach.call(cls, function(cls) {
          if( isNull(cls) ) return;
          var pos = ocls.indexOf(cls);
          if( ~pos ) ocls.splice(pos, 1);
        });
        
        ocls = ocls.join(' ').trim();
        if( ocls ) this.className = ocls;
        else this.removeAttribute('class');
      }
    });
  };
  
  fn.clearClass = fn.cc = function() {
    return this.each(function() {
      if( 'className' in this ) {
        this.className = '';
        this.removeAttribute('class');
      }
    });
  };
  
  fn.classes = fn.cls = function(cls) {
    if( !arguments.length ) return this[0] && this[0].className;
    if( !cls ) return this.cc();
    
    return this.each(function() {
      if( 'className' in this ) {
        this.className = cls;
      }
    });
  };
  
  fn.hasClass = fn.hc = function(cls) {
    if( typeof cls == 'string' ) cls = cls.split(' ');
    if( !isArrayLike(cls) || !cls.length ) return false;
    if( !this[0] || !this[0].className ) return false;
    
    var ocls = this[0].className.trim().split(' ');
    var exists = true;
    [].forEach.call(cls, function(cls) {
      if( isNull(cls) ) return;
      if( !~ocls.indexOf(cls) ) exists = false;
    });
    return exists;
  };
  
  fn.toggleClass = fn.tc = function(cls, bool) {
    if( typeof cls == 'string' ) cls = cls.split(' ');
    if( !isArrayLike(cls) || !cls.length ) return this;
    if( arguments.length >= 2 ) {
      if( bool ) this.ac(cls);
      else this.rc(cls);
      return this;
    }
    
    return this.each(function() {
      if( 'className' in this ) {
        var ocls = this.className.trim().split(' ');
        [].forEach.call(cls, function(cls) {
          if( isNull(cls) ) return;
          var pos = ocls.indexOf(cls);
          if( !~pos ) ocls.push(cls);
          else ocls.splice(pos, 1);
        });
        this.className = ocls.join(' ').trim();
      }
    });
  };
  
  fn.append = function(node, index) {
    if( !node && typeof node != 'string' ) return this;
    
    return this.each(function(i) {
      if( !isElement(this) ) return;
      
      var el = this;
      var ref = this.children[index];
      
      if( typeof node == 'function' ) node = node.call(this, i);
      if( isHTML(node) ) node = create(node);
      if( !isArrayLike(node) ) node = [node];
      
      if( ref && el.insertBefore ) {
        [].forEach.call(node, function(node) {
          if( typeof node == 'string' ) node = doc.createTextNode(node);
          if( !isNode(node) ) return;
          el.insertBefore(node, ref);
          ref = node;
        });
      } else if( el.appendChild ) {
        [].forEach.call(node, function(node) {
          if( typeof node == 'string' ) node = doc.createTextNode(node);
          if( !isNode(node) ) return;
          el.appendChild(node);
        });
      }
    });
  };
  
  fn.appendTo = function(target, index) {
    if( target && typeof target === 'string' ) target = this.$(target);
    
    var $ = this.$;
    return this.each(function() {
      $(target).append(this, index);
    });
  };
  
  fn.insertBefore = function(ref) {
    if( typeof ref == 'string' ) ref = this.$(ref);
    if( !isNode(ref) ) return this;
    
    var parent = ref.parentNode;
    if( !parent ) return this;
    
    return this.each(function() {
      if( parent.insertBefore ) {
        parent.insertBefore(this, ref);
      }
    });
  };
  
  fn.insertAfter = function(ref) {
    if( typeof ref == 'string' ) ref = this.$(ref);
    if( !isNode(ref) ) return this;
    
    var parent = ref.parentNode;
    var sib = ref.nextSibling;
    if( !parent ) return this;
    
    return this.each(function() {
      if( !isNode(this) ) return;
      
      if( !sib ) {
        parent.appendChild(this);
      } else if( parent.insertBefore ) {
        parent.insertBefore(this, sib);
      }
    });
  };
  
  fn.before = function(node) {
    var $ = this.$;
    return this.each(function() {
      $(this).insertBefore(node);
    });
  };
  
  fn.after = function(node) {
    var $ = this.$;
    return this.each(function() {
      $(node).insertAfter(this);
    });
  };
  
  fn.remove = function(node) {
    if( !arguments.length ) return this.each(function() {
      var p = this.parentNode;
      p && p.removeChild(this);
    });
    
    if( !node ) return;
    if( !isArrayLike(node) ) node = [node];
    
    var $ = this.$;
    return this.each(function() {
      if( this.removeChild ) {
        var el = this;
        [].forEach.call(node, function(node) {
          if( typeof node == 'string' ) return $(el).find(node).remove();
          el.removeChild(node);
        });
      }
    });
  };
  
  fn.clone = function(deep) {
    deep = deep === false ? false : true;
    var arr = this.$();
    this.each(function() {
      if( !isNode(this) ) return;
      arr.push(this.cloneNode(deep));
    });
    return arr;
  };
  
  fn.on = function(type, fn, bubble) {
    if( typeof type !== 'string' || !fn ) return this;
    type = type.split(' ');
    
    return this.each(function(i, el) {
      el.addEventListener && type.forEach(function(type) {
        el.addEventListener(type, fn, bubble || false);
      });
    });
  };
  
  fn.once = function(type, fn, bubble) {
    var wrapper = function(e) {
      this.removeEventListener(type, wrapper, bubble || false);
      fn.call(this, e);
    };
    
    return this.on(type, wrapper, bubble);
  };
  
  fn.off = function(type, fn, bubble) {
    if( typeof type !== 'string' || !fn ) return this;
    type = type.split(' ');
    
    return this.each(function(i, el) {
      el.removeEventListener && type.forEach(function(type) {
        el.removeEventListener(type, fn, bubble || false);
      });
    });
  };
  
  fn.fire = function(type, detail, cancellable, bubbles) {
    if( !(type instanceof Event) ) {
      type = new CustomEvent(type, {
        detail: detail,
        bubbles: !!bubbles,
        cancelable: !!cancellable
      });
    }
    
    var passed = this.$();
    this.each(function(i,el) {
      if( !el.dispatchEvent ) return;
      if( el.dispatchEvent(type) ) passed.push(el);
    });
    
    return passed;
  };
  
  fn.click = function(fn) {
    var isclick;
    if( !arguments.length ) isclick = true;
    
    return this.each(function(i,el) {
      if( isElement(el) ) {
        if( isclick ) el.click();
        else el.onclick = fn;
      }
    });
  };
  
  fn.value = function(value) {
    if( !arguments.length ) return this[0].value;
    
    return this.each(function(i,el) {
      if( isNode(el) ) el.value = value;
    });
  };
  
  fn.data = function(key, value) {
    if( !arguments.length ) return this[0]._data;
    
    var data = {};
    if( key && typeof key == 'object' ) data = key;
    else if( key === false ) data = false;
    else if( typeof key != 'string' ) return this;
    else data[key] = value;
    
    return this.each(function(i, el) {
      if( !isNode(el) ) return;
      if( data === false ) {
        delete el._data;
        return;
      }
      
      el._data = el._data || {};
      for( var k in data ) {
        el._data[k] = data[k];
      }
    });
  };
  
  fn.invoke = function(fn) {
    if( typeof fn !== 'function' ) return this;
    return this.each(function(i) {
      fn(this._data, i);
    });
  };
  
  fn.is = function(selector) {
    return matches(this[0], selector);
  };
  
  fn.parent = function(selector) {
    var arr = this.$();
    this.each(function() {
      if( !selector ) return arr.push(this.parentNode);
      
      var p = this;
      do {
        if( matches(p, selector) ) {
          arr.push(p);
          break;
        }
      } while(p = p.parentNode)
    });
    return arr;
  };
  
  fn.children = function(selector) {
    var arr = this.$();
    this.each(function() {
      var children = this.children;
      if( selector ) {
        [].forEach.call(children, function(el) {
          matches(el, selector) && arr.push(el);
        });
      } else {
        arr.add(children);
      }
    });
    return arr;
  };
  
  fn.wrap = function(html) {
    var $ = this.$;
    return this.each(function(i) {
      if( !isNode(this) ) return;
      
      var wrapper = html;
      if( typeof wrapper == 'function' )
        wrapper = wrapper.call(this, i);
      
      if( isHTML(wrapper) )
        wrapper = create(wrapper)[0];
      
      if( !isElement(wrapper) ) return;
      
      var parent = this.parentNode;
      var ref = this.nextSibling;
      wrapper = $(wrapper).append(this);
      
      if( ref ) wrapper.insertBefore(ref);
      else wrapper.appendTo(parent);
    });
  };
  
  fn.unwrap = function(selector) {
    var $ = this.$;
    return this.each(function() {
      if( !isNode(this) ) return;
      
      var p = selector ? $(this).parent(selector)[0] : this.parentNode;
      if( !p ) return;
      if( !p.parentNode ) return p.removeChild(this);
      
      var ref = p.nextSibling;
      if( ref ) p.parentNode.insertBefore(this, ref);
      else p.parentNode.appendChild(this);
      
      if( !p.childNodes.length ) p.parentNode.removeChild(p);
    });
  };
  
  fn.normalize = function() {
    return this.each(function() {
      if( isElement(this) ) this.normalize();
    })
  };
  
  fn.filter = function(fn) {
    if( typeof fn == 'string' ) {
      var selector = fn;
      fn = function() {
        return matches(this, selector);
      };
    }
    
    if( isArrayLike(fn) ) {
      var arr = [].slice.call(fn);
      fn = function() {
        return ~arr.indexOf(this);
      };
    }
    
    if( typeof fn != 'function' ) return this;
    
    var arr = this.$();
    this.each(function() {
      fn.apply(this, arguments) && arr.push(this);
    });
    return arr;
  };
  
  fn.has = function(selector) {
    if( !selector ) return false;
    
    var contains = false;
    this.each(function() {
      if( typeof selector == 'string' && this.querySelector && this.querySelector(selector) ) {
        contains = true;
      } else if( this.contains(selector) ) {
        selector = true;
      }
      
      if( contains ) return true;
    });
    return !!contains;
  };
  
  fn.nodes = function() {
    var arr = this.$();
    this.each(function() {
      arr.add(this.childNodes);
    });
    return arr;
  };
  
  fn.src = function(src) {
    return this.each(function() {
      if( 'src' in this ) this.src = src;
    });
  };
  
  fn.position = function(fn) {
    return offset(this[0]);
  };
  
  fn.offset = function(fn) {
    if( !arguments.length ) return offset(this[0], true);
    
    if( typeof fn == 'function' ) return this.each(function(i) {
      fn.call(this, i, offset(this, true));
    });
    
    var top = number(fn.top);
    var left = number(fn.left);
    if( !top && !left ) return this;
    
    return this.each(function() {
      var el = this;
      if( el.style ) {
        var position = computed(el).position;
        if( !position || position == 'static' ) el.style.position = 'relative';
        if( top ) el.style.top = top + 'px';
        if( left ) el.style.left = left + 'px';
      }
    });
  };
  
  fn.show = function() {
    return this.each(function() {
      var el = this;
      if( el.style ) {
        el.style.display = '';
        var display = computed(el).display;
        if( !display || display == 'none' ) el.style.display = 'block';
      }
    });
  };
  
  fn.hide = function() {
    return this.each(function() {
      if( this.style ) {
        this.style.display = 'none';
      }
    });
  };
  
  fn.async = function(iterator, done) {
    return async(this, iterator, done);
  };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);
var Container = __webpack_require__(2);

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
      
      el.children('a').on('click', function() {
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



/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var View = __webpack_require__(1);
var Container = __webpack_require__(2);
var Block = __webpack_require__(5);
var Label = __webpack_require__(8);
var Navigation = __webpack_require__(9);
var Tabbed = __webpack_require__(13);
var Cards = __webpack_require__(7);
var Profile = __webpack_require__(12);
var Anchor = __webpack_require__(3);
var Button = __webpack_require__(6);
var Toolbar = __webpack_require__(14);
var $ = __webpack_require__(0);
var perspectives = {};
var currentperspective;

var presets = {
  'default': __webpack_require__(11),
  'dashboard': __webpack_require__(10)
};

function Workbench(options) {
  if( typeof options == 'string' ) options = { preset: options };
  this._options = options || {};
  
  var preset = presets[options.preset || 'default'];
  if( !preset ) throw new Error('not exists preset');
  
  var view = this._view = View.create(preset.view);
  var dom = this._dom = $('<div>').ac('xw').append(view.dom())[0];
  
  dom.workbench = this;
}

Workbench.prototype = {
  dom: function() {
    return this._dom;
  },
  options: function() {
    return this._options;
  },
  view: function() {
    return this._view;
  },
  add: function(view) {
    this._view.add(view);
    return this;
  },
  get: function(id) {
    return this._view.get(id);
  },
  find: function(selector) {
    return this._view.find(selector);
  },
  findall: function(type) {
    return this._view.findall(type);
  },
  query: function(selector) {
    return this._view.query(selector);
  },
  render: function(target) {
    $(this._dom).appendTo(target);
    return this;
  },
  perspective: function(id, concrete) {
    if( !arguments.length ) return currentperspective;
    if( arguments.length === 1 ) return perspectives[id];
    
    if( typeof concrete == 'function' ) perspectives[id] = new concrete(this);
    else if( typeof concreate == 'object' ) perspectives[id] = concreate;
    else throw new TypeError('perspective must be a class(function) or object');
    
    return this;
  },
  switch: function(id) {
    var perspective = perspectives[id];
    if( !perspective ) throw new Error('not found perspective: ' + id);
    if( currentperspective === perspective ) return this;
    
    if( currentperspective && currentperspective.deactivate ) currentperspective.deactivate();
    currentperspective = perspective;
    perspective.activate && perspective.activate.apply(perspective, [].slice.call(arguments, 1));
    return this;
  },
  fire: function(type, detail, cancellable, bubble) {
    return this._view.fire.apply(this._view, arguments);
  },
  on: function(type, fn) {
    return this._view.on.apply(this._view, arguments);
  },
  once: function(type, fn) {
    return this._view.once.apply(this._view, arguments);
  },
  off: function(type, fn) {
    return this._view.off.apply(this._view, arguments);
  },
  Workbench: Workbench
};

View.type('default', Block);

Workbench.View = View;
Workbench.Containter = Container;
Workbench.Block = Block;
Workbench.Label = Label;
Workbench.Navigation = Navigation;
Workbench.Tabbed = Tabbed;
Workbench.Cards = Cards;
Workbench.Profile = Profile;
Workbench.Anchor = Anchor;
Workbench.Button = Button;
Workbench.Toolbar = Toolbar;
Workbench.type = View.type;

module.exports = Workbench;


/***/ })
/******/ ]);
});
//# sourceMappingURL=x-workbench.js.map