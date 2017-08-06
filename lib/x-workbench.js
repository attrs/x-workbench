var View = require('./view.js');
var Container = require('./container.js');
var Navigation = require('./navigation/navigation.js');
var Tabbed = require('./tabbed/tabbed.js');
var Cards = require('./cards/cards.js');
var $ = require('tinyselector');

function Workbench(options) {
  this._options = options || {};
  
  var view = this._view = new Container({
    flexbox: 'vertical',
    flex: 1,
    items: options.items
  });
  var dom = this._dom = $('<div>').ac('xw').append(view.dom())[0];
  dom.workbench = this;
}

Workbench.prototype = {
  import: function(src, done) {
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
  },
  createView: function(item) {
    return View.create(item);
  },
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
  Workbench: Workbench
};

View.type('default', Container);
View.type('container', Container);
View.type('navigation', Navigation);
View.type('tabbed', Tabbed);
View.type('cards', Cards);

Workbench.View = View;
Workbench.Containter = Container;
Workbench.Navigation = Navigation;
Workbench.Tabbed = Tabbed;
Workbench.Cards = Cards;
Workbench.type = View.type;

module.exports = Workbench;
