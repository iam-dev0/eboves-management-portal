export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              },
            ],
          },

          {
            path: '/products',
            name: 'Products',
            icon: 'crown',
            routes: [
              {
                path: '/products',
                name: 'Products',
                icon: 'smile',
                hideChildren: true,
                routes: [
                  {
                    path: '/products',
                    name: 'Product List',
                    icon: 'smile',
                    component: './Products/List',
                  },
                  {
                    path: '/products/Create',
                    name: 'Create Product',
                    icon: 'smile',
                    component: './Products/Create',
                  },
                  {
                    path: '/products/:id',
                    name: 'View Product',
                    icon: 'smile',
                    component: './Products/View',
                  },
                  {
                    path: '/products/:id/variation/Create',
                    name: 'Create Variation',
                    icon: 'smile',
                    component: './Products/Create/variation',
                  },
                ],
              },
              {
                path: '/brands',
                name: 'Brands',
                icon: 'smile',
                component: './Brands',
                // authority: ['admin'],
              },
            ],
          },
          {
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: './ListTableList',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
