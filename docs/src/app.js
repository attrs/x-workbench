var $ = require('tinyselector');
var Workbench = require('x-workbench');

var wb = new Workbench('dashboard'); 

wb
.find('logo')
.html('<a href="https://github.com/attrs/x-workbench" target="_blank"><b>X</b>WORKBENCH</a>');

wb
.find('topnav-left')
.items([
  {
    type: 'button',
    icon: '<i class="fa fa-bars"></i>'
  }
]);

wb
.find('topnav-right')
.items([
  {
    id: 'topbtn-messages',
    type: 'button',
    text: 'Messages',
    icon: '<i class="fa fa-bell-o"></i>',
    badge: '99+',
    items: [
      {
        icon: '<i class="fa fa-circle-o"></i>',
        text: 'menuitem 1'
      }
    ]
  }, {
    id: 'topbtn-user',
    type: 'button',
    icon: '<i class="fa fa-user-o"></i>',
    text: 'Puss in Boots',
    ddalign: 'right',
    items: [
      {
        icon: '<i class="fa fa-circle-o"></i>',
        text: 'menuitem 1'
      }, {
        icon: '<i class="fa fa-circle-o"></i>',
        text: 'menuitem 1'
      }, {
        icon: '<i class="fa fa-circle-o"></i>',
        text: 'menuitem 1'
      }, {
        icon: '<i class="fa fa-circle-o"></i>',
        text: 'menuitem 1'
      }, {
        icon: '<i class="fa fa-circle-o"></i>',
        text: 'menuitem 1'
      }
    ]
  }, {
    type: 'button',
    icon: '<i class="fa fa-arrows-alt"></i>'
  }
]);

wb
.find('sidebar')
.items([
  {
    type: 'profile',
    text: 'Puss in Boots',
    image: 'https://smirkingcat.files.wordpress.com/2011/11/pussnboots.jpg?w=320&h=155',
    links: [
      {
        text: 'Link 1',
        href: '#',
        target: '_blank'
      }, {
        text: 'Link 2',
        href: '#'
      }
    ]
  }, {
    id: 'sidebar-account',
    type: 'navigation',
    title: 'My Account',
    items: [
      {
        icon: '<i class="fa fa-cube"></i>',
        text: 'My Profile',
        badge: 'New',
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
            badge: 'New',
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
        badge: '99+'
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
]);

wb.find('sidebar-account').select('billing-service');


$(document).ready(function() {
  wb.render(document.body);
});