var $ = require('tinyselector');
var View = require('../view.js');
var Container = require('../container.js');
var NavItem = require('./navitem.js');

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
  var titleel = $(this.dom()).children('.xw-navigation-title');
  if( !arguments.length ) return titleel.html();
  titleel.html(title).tc('xw-hidden', title);
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