var $ = require('tinyselector');
var View = require('../view.js');

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