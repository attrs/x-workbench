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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Context = __webpack_require__(18);

__webpack_require__(19)(Context);

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
var minimatch = __webpack_require__(5);

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
    if( o.state ) self.state(o.state);
    if( typeof o.attrs == 'object' ) el.attrs(o.attrs);
    if( typeof o.attrs == 'function' ) el.attrs(o.attrs.call(self));
    if( typeof o.state == 'string' ) el.ac('xw-state-responder');
    if( typeof o.html == 'string' ) self.html(o.html);
    if( typeof o.html == 'function' ) self.html(o.html.call(self));

    var width = o.width;
    if( width ) {
      if( typeof width == 'function' ) width = width.call(self);

      if( typeof +width == 'number' ) el.css('width', width + 'px');
      else if( typeof width == 'string' ) el.css('width', width);
    }
    
    var height = o.height;
    if( height ) {
      if( typeof height == 'function' ) height = height.call(self);

      if( typeof +height == 'number' ) el.css('height', o.height + 'px');
      else if( typeof height == 'string' ) el.css('height', o.height);
    }
    
    Object.getOwnPropertyNames(o).forEach(function(name) {
      var fn = o[name];
      if( typeof fn != 'function' ) return;

      if( name.startsWith('on') ) self.on(name.substring(2), fn);
      else if( name.startsWith('$') ) self.on(name.substring(1), fn);
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
  state: function(state) {
    if( !arguments.length ) return this.stateresponder;

    var self = this;
    var dom = self.dom();
    var el = $(dom);

    if( !state ) {
      el.rc('xw-state-responder').attr('data-state', null);
      this.stateresponder = null;
      return self;
    }

    var responder;
    el.ac('xw-state-responder');
    if( typeof state == 'string' ) {
      el.attr('data-state', state);
      responder = function(o) {
        return minimatch(o.href, state);
      };
    } else if( typeof state == 'function' ) {
      responder = state;
    }

    self.stateresponder = responder;
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

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(25)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(23)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var minimatch = __webpack_require__(5);

var wrap = function(type) {
  var o = history[type];
  return function(state, title, href) {
    var result = o.apply(this, arguments);
    
    findandfire({
      type: type.toLowerCase(),
      state: state,
      href: href
    });
    return result;
  };
};

var findandfire = function(detail) {
  $('.xw-state-responder').each(function() {
    if( !this.view ) return;
    var view = this.view;
    var responder = view.state();
    
    if( typeof responder == 'function' && responder(detail) ) {
      this.view.fire('matchstate', detail);
    }
  });
};

history.pushState = wrap('pushState');
history.replaceState = wrap('replaceState');

window.addEventListener('popstate', function(e) {
  findandfire({
    type: 'popstate',
    state: history.state,
    href: location.pathname
  });
});

module.exports = function() {
  findandfire({
    type: 'init',
    state: history.state,
    href: location.pathname
  });
};

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
var NavItem = __webpack_require__(20);

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


/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports) {

module.exports = {
  view: {
    flexbox: 'vertical',
    flex: 1
  }
};

/***/ }),
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports) {


module.exports = function equal(arr1, arr2) {
  var length = arr1.length
  if (length !== arr2.length) return false
  for (var i = 0; i < length; i++)
    if (arr1[i] !== arr2[i])
      return false
  return true
}


/***/ }),
/* 18 */
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
/* 19 */
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
/* 20 */
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



/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var View = __webpack_require__(1);
var Container = __webpack_require__(2);
var Block = __webpack_require__(6);
var Label = __webpack_require__(10);
var Navigation = __webpack_require__(11);
var Tabbed = __webpack_require__(15);
var Cards = __webpack_require__(8);
var Profile = __webpack_require__(14);
var Anchor = __webpack_require__(3);
var Button = __webpack_require__(7);
var Toolbar = __webpack_require__(16);
var $ = __webpack_require__(0);
var equals = __webpack_require__(17);
var detectstate = __webpack_require__(9);
var perspectives = {};
var currentperspective;
var currentperspecticearg = [];

var presets = {
  'default': __webpack_require__(13),
  'dashboard': __webpack_require__(12)
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
  findview: function(selector) {
    return this._view.findview(selector);
  },
  findall: function(type) {
    return this._view.findall(type);
  },
  query: function(selector) {
    return this._view.query(selector);
  },
  render: function(target) {
    $(this._dom).appendTo(target);
    detectstate();
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
    var arg = [].slice.call(arguments, 1);
    if( !perspective ) throw new Error('not found perspective: ' + id);
    if( currentperspective === perspective && equals(arg, currentperspecticearg) ) return this;
    
    if( currentperspective && currentperspective.deactivate ) currentperspective.deactivate();
    currentperspective = perspective;
    currentperspecticearg = arg;
    perspective.activate && perspective.activate.apply(perspective, arg);
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


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var concatMap = __webpack_require__(24);
var balanced = __webpack_require__(22);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;


/***/ })
/******/ ]);
});
//# sourceMappingURL=x-workbench.js.map