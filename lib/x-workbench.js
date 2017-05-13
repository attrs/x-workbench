var View = require('./view.js');
var Container = require('./container.js');
var Navigation = require('./navigation.js');
var Tabbed = require('./tabbed.js');
var $ = require('tinyselector');

function Workbench(options) {
  this._options = options || {};
  
  var view = this._view = new Container({
    flexbox: 'vertical',
    flex: 1
  });
  var dom = this._dom = $('<div>').ac('xw').append(view.dom())[0];
  dom.workbench = this;
  
  view
  .add({
    id: 'topbar',
    cls: 'xw-topbar',
    flexbox: 'horizontal',
    items: [
      {
        id: 'logo',
        cls: 'xw-logo',
        width: 250
      }, {
        id: 'topnav',
        flex: 1,
        items: [
          {
            id: 'topnav-left'
          }, {
            id: 'topnav-right',
            float: 'right'
          }
        ]
      }
    ]
  })
  .add({
    id: 'center',
    flexbox: 'horizontal',
    flex: 1,
    items: [
      {
        id: 'sidebar',
        width: 250,
        cls: 'xw-sidebar dark',
        flexbox: 'vertical',
        items: [
          {
            id: 'sideheader'
          }, {
            id: 'sidetabs',
            type: 'tabbed',
            oneline: true,
            flex: 1,
            cls: 'mt10'
          }
        ]
      }, {
        id: 'page',
        cls: 'xw-page',
        flex: 1
      }
    ]
  });
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

Workbench.View = View;
Workbench.Containter = Container;
Workbench.Navigation = Navigation;
Workbench.Tabbed = Tabbed;

module.exports = Workbench;
