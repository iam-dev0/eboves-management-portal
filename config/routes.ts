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
              path: '/',
              name: 'Products',
              icon: 'crown',
              // component: './Admin',
              // authority: ['admin'],
              routes: [
                {
                  path: '/products',
                  name: 'Products',
                  icon: 'smile',
                  component: './Products/View',
                  // authority: ['admin'],
                },
                {
                  path: '/products/Create',
                  name: 'Create Product',
                  icon: 'smile',
                  component: './Products/Create',
                  // authority: ['admin'],
                },
                {
                  path: '/products/:id/variation/Create',
                  name: 'Create Variation',
                  icon: 'smile',
                  component: './Products/Create/variation',
                  // authority: ['admin'],
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
  ]