var View = require('./view.js');
var Container = require('./container.js');
var Block = require('./block/block.js');
var Label = require('./label/label.js');
var Navigation = require('./navigation/navigation.js');
var Tabbed = require('./tabbed/tabbed.js');
var Cards = require('./cards/cards.js');
var $ = require('tinyselector');
var perspectives = {};
var currentperspective;

var presets = {
  'default': require('./presets/default.js'),
  'dashboard': require('./presets/dashboard.js')
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
  /*import: function(src, done) {
    var head = document.head || document.getElementsByTagName('head')[0];
  
    var script = document.createElement('script');
    script.type = 'text\/javascript';
    script.onerror = function(err) {
      done(new URIError('script load error: ' + err.target.src));
    };
    script.onload = function() {
      done();
    };
    head.appendChild(script);
    script.src = src;
  },*/
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
View.type('block', Block);
View.type('label', Label);
View.type('navigation', Navigation);
View.type('tabbed', Tabbed);
View.type('cards', Cards);

Workbench.View = View;
Workbench.Containter = Container;
Workbench.Block = Block;
Workbench.Label = Label;
Workbench.Navigation = Navigation;
Workbench.Tabbed = Tabbed;
Workbench.Cards = Cards;
Workbench.type = View.type;

module.exports = Workbench;
