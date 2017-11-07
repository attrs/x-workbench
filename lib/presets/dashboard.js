module.exports = {
  target: 'page',
  view: {
    flexbox: 'vertical',
    flex: 1,
    items: [
      {
        id: 'topbar',
        cls: 'xw-dashboard-topbar',
        style: {
          '-webkit-app-region': 'drag'
        },
        flexbox: 'horizontal',
        items: [
          {
            id: 'logo',
            cls: 'xw-logo',
            width: 250
          }, {
            id: 'topnav',
            flex: 1,
            flexbox: 'horizontal',
            items: [
              {
                id: 'topnav-left',
                type: 'toolbar'
              }, {
                id: 'topnav-right',
                type: 'toolbar',
                flex: 1,
                style: {
                  'text-align': 'right'
                }
              }
            ]
          }
        ]
      }, {
        id: 'center',
        flexbox: 'horizontal',
        flex: 1,
        items: [
          {
            id: 'sidebar-wrapper',
            flexbox: 'vertical',
            cls: 'xw-dashboard-sidebar xw-dark',
            width: 250,
            items: [
              {
                id: 'sidebar',
                type: 'block'
              }
            ]
          }, {
            id: 'page',
            cls: 'xw-page',
            flex: 1
          }
        ]
      }
    ]
  }
};