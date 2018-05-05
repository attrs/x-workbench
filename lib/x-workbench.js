var View = require('./view.js');
var Container = require('./container.js');
var Block = require('./block/block.js');
var Label = require('./label/label.js');
var Navigation = require('./navigation/navigation.js');
var Tabbed = require('./tabbed/tabbed.js');
var Cards = require('./cards/cards.js');
var Profile = require('./profile/profile.js');
var Anchor = require('./anchor/anchor.js');
var Button = require('./button/button.js');
var Toolbar = require('./toolbar/toolbar.js');
var $ = require('tinyselector');
var equals = require('array-equal');
var detectstate = require('./detectstate.js');
var perspectives = {};
var currentperspective;
var currentperspecticearg = [];

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
