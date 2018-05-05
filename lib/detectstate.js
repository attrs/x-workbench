var $ = require('tinyselector');
var minimatch = require("minimatch");

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