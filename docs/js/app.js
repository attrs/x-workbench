/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Context = __webpack_require__(5);

__webpack_require__(6)(Context);

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
    var el = $(dom).attr('id', o.id).ac('xw-view');
    
    if( o.style ) el.css(o.style);
    if( o.cls ) el.ac(o.cls);
    if( o.flexbox ) el.attr('flexbox', o.flexbox);
    if( o.flex ) el.attr('flex', o.flex);
    if( o.width ) el.css('width', o.width + 'px');
    if( o.html ) el.html(o.html);
    
    Object.getOwnPropertyNames(o).forEach(function(name) {
      if( !~['on', 'once'].indexOf(name) && !name.indexOf('on') ) {
        if( typeof o[name] == 'function' )
          self.on(name.substring(2), o[name]);
      }
    });
  },
  create: function(o) {
    console.log('view create', o);
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

View.create = function(o, deftype) {
  if( !arguments.length ) return new View();
  if( !o ) return console.error('arguments cannot be null');
  if( o instanceof View ) return o;
  
  var Type = o.type ? types[o.type] : types[deftype || 'default'];
  if( !Type ) return console.error('not fount view type: ' + (o.type || deftype));
  
  return new Type(o);
};

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
    self.fire('additem', {item:item, index: items.indexOf(item)});
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
  self.fire('clearitems');
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

/* WEBPACK VAR INJECTION */(function(setImmediate) {var matches = Element.prototype.matches || 
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26).setImmediate))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24);

module.exports = __webpack_require__(17);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var win = window;
var Extensions = function() {}
Extensions.prototype = new Array();
var extensions = new Extensions();

var util = __webpack_require__(3);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(3);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var Workbench = __webpack_require__(4);

var wb = new Workbench('dashboard'); 

wb.find('logo').html('<a href="https://github.com/attrs/x-workbench" target="_blank"><b>X</b>WORKBENCH</a>')
.workbench()
.find('sidebar-cards')
.additem({
  items: [
    {
      type: 'profile',
      image: 'https://pbs.twimg.com/profile_images/497768178248728577/6mQeoo4D_400x400.jpeg',
      links: [
        {
          text: 'Link 1',
          href: '#',
          target: '_blank'
        }, {
          text: 'Link 2',
          href: '#'
        }
      ],
      text: 'User Name'
    }, {
      id: 'sidebar-account',
      type: 'navigation',
      title: 'My Account',
      items: [
        {
          icon: '<i class="fa fa-cube"></i>',
          text: 'My Profile',
          items: [
            {
              icon: '<i class="fa fa-user-o"></i>',
              text: 'Profile',
              onclick: function(e) {
                console.log('Profile', e);
              }
            }, {
              id: 'billing',
              icon: '<i class="fa fa-credit-card"></i>',
              text: 'Billing',
              items: [
                {
                  id: 'billing-service',
                  icon: '<i class="fa fa-cube"></i>',
                  text: 'Service'
                }, {
                  icon: '<i class="fa fa-gear"></i>',
                  text: 'Etc'
                }
              ]
            }, {
              icon: '<i class="fa fa-rocket"></i>',
              text: 'Subscribes'
            }
          ]
        }, {
          icon: '<i class="fa fa-circle-o"></i>',
          text: 'Actions',
          items: [
          ]
        }, {
          icon: '<i class="fa fa-comments"></i>',
          text: 'Messages',
          badge: '91'
        }
      ]
    }, {
      id: 'sidebar-service',
      type: 'navigation',
      title: 'Service',
      items: [
        {
          icon: '<i class="fa fa-cube"></i>',
          text: 'Services',
          items: [
            {
              id: 'instances',
              icon: '<i class="fa fa-list"></i>',
              text: 'Instances'
            }, {
              id: 'apps',
              icon: '<i class="fa fa-list"></i>',
              text: 'Applications'
            }
          ]
        }, {
          icon: '<i class="fa fa-gear"></i>',
          text: 'Configuration'
        }
      ]
    }
  ]
});

wb.find('sidebar-account').select('billing-service');


$(document).ready(function() {
  wb.render(document.body);
});

/***/ }),
/* 8 */
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
    var view = View.create(item);
    view.dom()._item = item;
    el.append(view.dom());
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
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);
var Container = __webpack_require__(2);
var NavItem = __webpack_require__(12);

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
  var itemel = $(this.dom()).find('.xw-active')[0];
  return itemel && itemel.view;
};

proto.select = function(id) {
  var item = this.find(id);
  item && item.select();
  return this;
};

View.type('navigation', Navigation);
module.exports = Navigation;

/*
<div class="xw-navigation">
  <div class="xw-navigation-title">Title</div>
  <ul class="xw-navigation-items">
    <li class="xw-navitem">
      <a href="#">
        <i class="xw-navitem-icon fa fa-rocket"></i>
        <span class="xw-navitem-label">Label</span>
      </a>
    </li>
    <li class="xw-navitem">
      <a class="xw-navitem-accordion xw-navitem-open" href="javascript:;">
        <i class="xw-navitem-icon fa fa-rocket"></i>
        <span class="xw-navitem-label">Label</span>
        <i class="xw-navitem-caret"></i>
      </a>
      <ul class="xw-navitem-items">
        <li class="xw-navitem xw-active">
          <a href="#">
            <i class="xw-navitem-icon fa fa-rocket"></i>
            <span class="xw-navitem-label">Label</span>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</div>
*/

/***/ }),
/* 12 */
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



/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {
  target: 'page',
  view: {
    flexbox: 'vertical',
    flex: 1,
    items: [
      {
        id: 'topbar',
        cls: 'xw-topbar',
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
                id: 'topnav-left'
              }, {
                id: 'topnav-right',
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
            id: 'sidebar',
            flexbox: 'vertical',
            cls: 'xw-sidebar xw-dark',
            width: 250,
            items: [
              {
                id: 'sidebar-cards',
                type: 'cards'
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
/* 14 */
/***/ (function(module, exports) {

module.exports = {
  view: {
    flexbox: 'vertical',
    flex: 1
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var View = __webpack_require__(1);

function Profile(options) {
  View.apply(this, arguments);
}

var proto = Profile.prototype = Object.create(View.prototype);

proto.create = function() {
  return $('<div class="xw-profile">\
    <div class="xw-profile-image xw-hidden">\
      <img src="" />\
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

proto.init = function(o) {
  this.update();
};

proto.update = function() {
  var o = this.options();
  
  this
  .text(o.text)
  .image(o.image)
  .links(o.links);
}

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
  el.find('img').attr('src', image);
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
    var anchor = $('<a>').html(link.text || 'Link').attr({
      href: link.href || 'javascript:;',
      target: link.target
    });
    el.append(anchor);
  });
  
  o.links = links;
  return this;
};

View.type('profile', Profile);
module.exports = Profile;

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var View = __webpack_require__(1);
var Container = __webpack_require__(2);
var Block = __webpack_require__(8);
var Label = __webpack_require__(10);
var Navigation = __webpack_require__(11);
var Tabbed = __webpack_require__(16);
var Cards = __webpack_require__(9);
var Profile = __webpack_require__(15);
var $ = __webpack_require__(0);
var perspectives = {};
var currentperspective;

var presets = {
  'default': __webpack_require__(14),
  'dashboard': __webpack_require__(13)
};

function Workbench(options) {
  if( typeof options == 'string' ) options = { preset: options };
  this._options = options || {};
  
  var preset = presets[options.preset || 'default'];
  if( !preset ) throw new Error('not exists preset');
  
  var view = this._view = View.create(preset.view);
  
  if( options.items ) {
    if( preset.target ) view.find(preset.target).add(options.items);
    else view.add(options.items);
  }
  
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
Workbench.type = View.type;

module.exports = Workbench;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(undefined);
// imports


// module
exports.push([module.i, ".xw {\n  padding: 0;\n  margin: 0;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  flex-flow: column;\n  /*\n.xw-dark .xw-navigation, .xw-navigation.xw-dark {\n  & > li {\n    a {\n      color: darken(@text-color-dark, 5%);\n      \n      & > i {\n        color: lighten(@text-color-dark, 10%);\n      }\n    }\n    \n    &.active {\n      & > a {\n        color: lighten(@text-color-dark, 10%);\n         \n        & > i {\n         color: @active-color-dark;\n        }\n      }\n    }\n  \n    &.xw-navigation-label {\n      color: @navigation-label-color-dark;\n    }\n    \n    ul {\n      background-color: darken(@navigation-bg-color, 2%);\n      \n      & > li {\n        & > a {\n          color: #ddd;\n          \n          &:hover {\n            color: #fff;\n          }\n        }\n        \n        &.active {\n          & > a > i {\n            color: @active-color-dark;\n          }\n        }\n      }\n    }\n  }\n}\n*/\n  /* alignment in main axis */\n  /* self alignment */\n}\n.xw .xw-topbar {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.07);\n  height: 61px;\n  transition: all 0.2s ease;\n}\n.xw .xw-topbar > * {\n  height: 60px;\n}\n.xw .xw-topbar > .pull-left {\n  float: left;\n}\n.xw .xw-topbar > .pull-right {\n  float: right;\n}\n.xw .xw-topbar .xw-logo {\n  position: relative;\n  overflow: hidden;\n  width: 250px;\n  height: 60px;\n  box-sizing: border-box;\n  color: #3E3E3E;\n  line-height: 58px;\n  padding: 0;\n  padding-left: 15px;\n  font-size: 17px;\n  letter-spacing: 0.5px;\n}\n.xw .xw-topbar .xw-nav {\n  padding: 0;\n  margin: 0;\n}\n.xw .xw-topbar .xw-nav > li {\n  margin-left: 0;\n}\n.xw .xw-topbar .xw-nav > li > a {\n  color: #3E3E3E;\n  font-size: 12px;\n  font-weight: 600;\n  padding: 0 15px;\n  line-height: 60px;\n  margin: 0;\n}\n.xw .xw-topbar .xw-form-group {\n  margin: 0;\n  padding: 0;\n  line-height: 56px;\n}\n.xw .xw-topbar .xw-form-group > input[type=\"text\"] {\n  display: inline-block;\n  width: 220px;\n  vertical-align: middle;\n  background-color: transparent;\n  height: 27px;\n  padding: 0 12px;\n  transition: all 0.2s ease;\n  border-radius: 19px;\n  border-color: rgba(0, 0, 0, 0.07);\n  font-size: 12px;\n  line-height: 1.5em;\n  color: #3E3E3E;\n  border: 1px solid #dddddd;\n}\n.xw .xw-topbar .xw-form-group > input[type=\"text\"]:focus {\n  background-color: #f8f8f8;\n  border-color: #f0f0f0;\n  outline: none;\n  box-shadow: none;\n}\n.xw .xw-topbar a,\n.xw .xw-topbar a:hover,\n.xw .xw-topbar a:active,\n.xw .xw-topbar a:focus {\n  text-decoration: none;\n}\n.xw .xw-sidebar {\n  position: relative;\n  overflow-y: auto;\n  padding-top: 10px;\n}\n.xw .xw-sidebar::-webkit-scrollbar-track {\n  background-color: rgba(255, 255, 255, 0.9);\n}\n.xw .xw-sidebar::-webkit-scrollbar {\n  width: 5px;\n  height: 5px;\n  background-color: rgba(255, 255, 255, 0.9);\n}\n.xw .xw-sidebar::-webkit-scrollbar-thumb {\n  background-color: rgba(0, 0, 0, 0.85);\n  border-radius: 5px;\n}\n.xw .xw-page {\n  position: relative;\n  background-color: #eee;\n  overflow: auto;\n}\n.xw .xw-page .xw-table-layout {\n  flex: 1;\n  display: flex;\n  flex-flow: row;\n  overflow: auto;\n}\n.xw .xw-page .xw-table-layout.hidden {\n  display: none;\n  width: 0;\n}\n.xw .xw-page .xw-table-layout .xw-tray {\n  transition: all 0.25s ease;\n}\n.xw .xw-page .xw-table-layout .xw-tray.xw-tray-center {\n  flex: 1;\n  order: 1;\n}\n.xw .xw-page .xw-table-layout .xw-tray.xw-tray-right {\n  width: 280px;\n  max-width: 280px;\n  order: 100;\n  background-color: #f6f6f6;\n  border-left: 1px solid rgba(0, 0, 0, 0.07);\n}\n.xw .xw-page .xw-table-layout .xw-tray.xw-tray-left {\n  width: 280px;\n  max-width: 280px;\n  order: -100;\n  background-color: #f6f6f6;\n  border-right: 1px solid rgba(0, 0, 0, 0.07);\n}\n.xw .xw-footer {\n  color: #aaa;\n  font-size: 13px;\n  overflow: hidden;\n  padding: 10px 0px;\n  background-color: #fafafa;\n  border-top: 1px solid rgba(0, 0, 0, 0.07);\n}\n.xw .xw-footer b {\n  color: #919191;\n}\n.xw .xw-footer > .row {\n  margin: 0;\n}\n.xw .xw-footer .icon {\n  margin-left: 7px;\n  display: inline-block;\n  color: #aaa;\n  padding: 3px 7px;\n  background-color: #eaeaea;\n  border-radius: 3px;\n  transition: all 0.25s ease;\n}\n.xw .xw-footer .icon:hover {\n  color: #3E3E3E;\n}\n.xw .xw-navigation {\n  margin: 20px 0 15px 0;\n  font-size: 0.9em;\n}\n.xw .xw-navigation .xw-navigation-title {\n  padding-left: 15px;\n  line-height: 20px;\n  text-transform: uppercase;\n  color: inherit;\n  font-weight: bold;\n  font-size: 0.9em;\n  opacity: .65;\n}\n.xw .xw-navigation > ul.xw-navigation-items {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.xw .xw-navigation a,\n.xw .xw-navigation a:hover,\n.xw .xw-navigation a:active,\n.xw .xw-navigation a:focus {\n  text-decoration: none;\n}\n.xw li.xw-navitem {\n  position: relative;\n  display: block;\n  padding: 0;\n  margin: 0;\n}\n.xw li.xw-navitem > a {\n  position: relative;\n  display: block;\n  padding: 0;\n  line-height: 37px;\n  height: 37px;\n  padding-left: 15px;\n  overflow: hidden;\n  color: inherit;\n}\n.xw li.xw-navitem > a:hover,\n.xw li.xw-navitem > a:active,\n.xw li.xw-navitem > a:focus {\n  text-decoration: none;\n  background: none;\n}\n.xw li.xw-navitem > a:hover i {\n  color: #5faee3;\n}\n.xw li.xw-navitem > a > .xw-navitem-icon > i {\n  line-height: 1em;\n  font-size: 1em;\n  color: #585858;\n  width: 27px;\n  text-align: center;\n}\n.xw li.xw-navitem > a > .xw-navitem-caret {\n  margin: 0;\n  border: 0;\n}\n.xw li.xw-navitem > a > .xw-navitem-caret:after {\n  position: absolute;\n  right: 17px;\n  top: 8px;\n  color: #aaa;\n  content: \"\\F105\";\n  font-family: FontAwesome;\n  line-height: 20px;\n  font-size: 1em;\n  font-style: normal;\n  display: inline-block;\n}\n.xw li.xw-navitem.xw-navitem-open > a > .xw-navitem-caret:after {\n  content: \"\\F107\";\n}\n.xw li.xw-navitem a > .xw-navigation-badge {\n  position: absolute;\n  right: 13px;\n  top: -2px;\n}\n.xw li.xw-navitem a > .xw-navigation-badge:active,\n.xw li.xw-navitem a > .xw-navigation-badge:focus {\n  outline: none !important;\n}\n.xw li.xw-navitem a > .xw-navigation-badge .label {\n  font-size: 0.85em;\n  padding: .1em .6em .3em;\n}\n.xw li.xw-navitem.xw-navitem-active > a > .xw-navitem-icon > i {\n  color: #3498db;\n}\n.xw li.xw-navitem > ul.xw-navitem-items {\n  display: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  background-color: rgba(0, 0, 0, 0.15);\n}\n.xw li.xw-navitem > ul.xw-navitem-items > li {\n  line-height: 44px;\n}\n.xw li.xw-navitem > ul.xw-navitem-items > li > a {\n  border-left: 1px solid transparent;\n  padding-left: 30px;\n}\n.xw li.xw-navitem > ul.xw-navitem-items > li > a:hover {\n  border-left: 1px solid #3498db;\n}\n.xw li.xw-navitem > ul.xw-navitem-items > li.xw-navitem-active > a {\n  border-left: 1px solid #3498db;\n}\n.xw li.xw-navitem > ul.xw-navitem-items > li.xw-navitem-active > a > .xw-navitem-icon > i {\n  color: #5faee3;\n}\n.xw li.xw-navitem > ul.xw-navitem-items > li > ul.xw-navitem-items li > a {\n  padding-left: 45px;\n}\n.xw li.xw-navitem.xw-navitem-open > ul.xw-navitem-items {\n  display: block;\n}\n.xw .xw-tab {\n  display: flex;\n  flex-direction: column;\n}\n.xw .xw-tab > .xw-tab-body {\n  flex: 1;\n}\n.xw .xw-tab > .xw-tab-body > * {\n  display: none;\n}\n.xw .xw-tab > .xw-tab-body > .active {\n  display: block;\n}\n.xw .xw-tab > .xw-tab-tabs {\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n}\n.xw .xw-tab > .xw-tab-tabs .xw-tab-item {\n  display: table-cell;\n  border-top: 1px solid rgba(0, 0, 0, 0.07);\n  border-left: 1px solid rgba(0, 0, 0, 0.07);\n  padding: 6px;\n  text-align: center;\n  cursor: pointer;\n  color: #646464;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  word-wrap: normal;\n  overflow: hidden;\n  font-size: 0.8em;\n}\n.xw .xw-tab > .xw-tab-tabs .xw-tab-item .xw-tab-item-icon {\n  font-size: 1.6em;\n  margin-bottom: 5px;\n}\n.xw .xw-tab > .xw-tab-tabs .xw-tab-item.active {\n  color: #3E3E3E;\n  background-color: initial;\n  border-top: 1px solid transparent;\n}\n.xw .xw-tab > .xw-tab-tabs .xw-tab-item.active .xw-tab-item-icon {\n  color: #3498db;\n}\n.xw .xw-tab > .xw-tab-tabs .xw-tab-item:first-child {\n  border-left: 1px solid transparent;\n}\n.xw .xw-tab.xw-tab-icon-only .xw-tab-item .xw-tab-item-title {\n  display: none;\n}\n.xw .xw-tab.xw-tab-title-only .xw-tab-item .xw-tab-item-icon {\n  display: none;\n}\n.xw .xw-tab.xw-tab-oneline .xw-tab-item {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  word-wrap: normal;\n  overflow: hidden;\n  font-size: 0.9em;\n  line-height: 1em;\n  padding: 12px 8px;\n}\n.xw .xw-tab.xw-tab-oneline .xw-tab-item .xw-tab-item-icon {\n  font-size: 1em;\n  line-height: 1em;\n  display: inline-block;\n  margin-right: 8px;\n  margin-bottom: 0;\n}\n.xw .xw-dark .xw-tab > .xw-tab-tabs .xw-tab-item,\n.xw .xw-tab.xw-dark > .xw-tab-tabs .xw-tab-item {\n  border-top: 1px solid rgba(255, 255, 255, 0.07);\n  border-left: 1px solid rgba(255, 255, 255, 0.07);\n  background-color: #212523;\n  color: #a3a5a5;\n}\n.xw .xw-dark .xw-tab > .xw-tab-tabs .xw-tab-item.active,\n.xw .xw-tab.xw-dark > .xw-tab-tabs .xw-tab-item.active {\n  color: #CACBCB;\n  background-color: #2D3230;\n  border-top: 1px solid transparent;\n}\n.xw .xw-dark .xw-tab > .xw-tab-tabs .xw-tab-item.active .xw-tab-item-icon,\n.xw .xw-tab.xw-dark > .xw-tab-tabs .xw-tab-item.active .xw-tab-item-icon {\n  color: #55AAC7;\n}\n.xw .xw-dark .xw-tab > .xw-tab-tabs .xw-tab-item:first-child,\n.xw .xw-tab.xw-dark > .xw-tab-tabs .xw-tab-item:first-child {\n  border-left: 1px solid transparent;\n}\n.xw [flexbox] {\n  display: flex;\n  flex-direction: column;\n}\n.xw [flexbox~=\"vertical\"] {\n  flex-direction: column;\n}\n.xw [flexbox~=\"horizontal\"] {\n  flex-direction: row;\n}\n.xw [flexbox~=\"wrap\"] {\n  flex-wrap: wrap;\n}\n.xw [flexbox~=\"horizontal\"][flexbox~=\"reverse\"] {\n  flex-direction: row-reverse;\n}\n.xw [flexbox~=\"vertical\"][flexbox~=\"reverse\"] {\n  flex-direction: column-reverse;\n}\n.xw [flexbox~=\"wrap\"][flexbox~=\"reverse\"] {\n  flex-wrap: wrap-reverse;\n}\n.xw [flexbox~=\"inline\"] {\n  display: inline-flex;\n}\n.xw [flex] {\n  -ms-flex: 1 1 0.000000001px;\n  flex: 1;\n}\n.xw [flex=\"auto\"] {\n  -ms-flex: 1 1 auto;\n  flex-basis: auto;\n}\n.xw [flex=\"none\"] {\n  flex: none;\n}\n.xw [flex=\"1\"] {\n  flex: 1;\n}\n.xw [flex=\"2\"] {\n  flex: 2;\n}\n.xw [flex=\"3\"] {\n  flex: 3;\n}\n.xw [flex=\"4\"] {\n  flex: 4;\n}\n.xw [flex=\"5\"] {\n  flex: 5;\n}\n.xw [flex=\"6\"] {\n  flex: 6;\n}\n.xw [flex=\"7\"] {\n  flex: 7;\n}\n.xw [flex=\"8\"] {\n  flex: 8;\n}\n.xw [flex=\"9\"] {\n  flex: 9;\n}\n.xw [flex=\"10\"] {\n  flex: 10;\n}\n.xw [flex=\"11\"] {\n  flex: 11;\n}\n.xw [flex=\"12\"] {\n  flex: 12;\n}\n.xw [flexbox][align=\"start\"] {\n  -ms-flex-align: start;\n  align-items: flex-start;\n}\n.xw [flexbox][align=\"center\"] {\n  -ms-flex-align: center;\n  align-items: center;\n}\n.xw [flexbox][align=\"end\"] {\n  -ms-flex-align: end;\n  align-items: flex-end;\n}\n.xw [flexbox][justify] {\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n.xw [flexbox][justify=\"start\"] {\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n}\n.xw [flexbox][justify=\"center\"] {\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n.xw [flexbox][justify=\"end\"] {\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}\n.xw [flexbox][justify=\"space-around\"],\n.xw [flexbox][justify=\"distribute\"] {\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n}\n.xw [flexbox][align=\"center center\"],\n.xw [flexbox][justify=\"center center\"] {\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n.xw [flexbox][align-self=\"start\"] {\n  -ms-align-self: flex-start;\n  align-self: flex-start;\n}\n.xw [flexbox][align-self=\"center\"] {\n  -ms-align-self: center;\n  align-self: center;\n}\n.xw [flexbox][align-self=\"end\"] {\n  -ms-align-self: flex-end;\n  align-self: flex-end;\n}\n.xw [flexbox][align-self=\"stretch\"] {\n  -ms-align-self: stretch;\n  align-self: stretch;\n}\n.xw [flexbox][stretch] {\n  -ms-align-self: stretch;\n  align-self: stretch;\n}\n.xw .xw-cards > * {\n  display: none;\n}\n.xw .xw-cards > .active {\n  display: inherit;\n}\n.xw .xw-profile {\n  position: relative;\n  margin: 15px;\n  font-size: 0.9em;\n}\n.xw .xw-profile .xw-profile-image {\n  display: table-cell;\n  vertical-align: top;\n  padding-right: 10px;\n}\n.xw .xw-profile .xw-profile-image img {\n  display: block;\n  vertical-align: middle;\n  height: auto;\n  max-width: 40px;\n  border: 2px solid #888;\n  border-radius: 50%;\n}\n.xw .xw-profile .xw-profile-body {\n  display: table-cell;\n  vertical-align: middle;\n  padding-left: 3px;\n}\n.xw .xw-profile .xw-profile-body .xw-profile-links {\n  font-size: 0.95em;\n  margin-bottom: 3px;\n  opacity: 0.7;\n}\n.xw .xw-profile .xw-profile-body .xw-profile-links a {\n  margin-right: 5px;\n}\n.xw .xw-profile .xw-profile-body .xw-profile-text {\n  font-size: 1.1em;\n  font-weight: bold;\n}\n.xw .xw-profile a,\n.xw .xw-profile a:hover,\n.xw .xw-profile a:active,\n.xw .xw-profile a:focus {\n  text-decoration: none;\n}\n.xw.xw-dark,\n.xw .xw-dark {\n  background-color: #2D3230;\n  color: #CACBCB;\n}\n.xw.xw-dark a,\n.xw .xw-dark a,\n.xw.xw-dark a:hover,\n.xw .xw-dark a:hover,\n.xw.xw-dark a:active,\n.xw .xw-dark a:active,\n.xw.xw-dark a:focus,\n.xw .xw-dark a:focus {\n  color: #CACBCB;\n}\n.xw .xw-hidden {\n  display: none !important;\n}\n", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25), __webpack_require__(20)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(23);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(22)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/index.js!./index.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/index.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(21);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map