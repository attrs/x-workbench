var $ = require('tinyselector');
var Workbench = require('x-workbench');

var wb = new Workbench('dashboard');

wb.find('logo').html('<b>X</b>WORKBENCH')
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