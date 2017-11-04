var $ = require('tinyselector');
var Workbench = require('x-workbench');

var wb = new Workbench('dashboard');

wb.find('logo').html('<b>X</b>WORKBENCH');

wb.find('sidebar').items({
  id: 'sidebar-cards',
  type: 'cards',
  items: [
    {
      //type: 'tabbed',
      items: [
        {
          items: [
            {
              type: 'navigation',
              title: 'My Account',
              items: [
                {
                  link: '#',
                  icon: '<i class="fa fa-rocket"></i>',
                  text: 'My Profile',
                  items: [
                    {
                      link: '#',
                      icon: '<i class="fa fa-rocket"></i>',
                      text: 'My Profile'
                    }
                  ]
                }, {
                  link: '#',
                  icon: '<i class="fa fa-rocket"></i>',
                  text: 'Billing',
                  items: [
                
                  ]
                }, {
                  link: '#',
                  icon: '<i class="fa fa-rocket"></i>',
                  text: 'Messages',
                  badge: '91'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});


$(document).ready(function() {
  console.log('workbench', wb);
  wb.render(document.body);
});