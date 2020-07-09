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
            path: '/product-module',
            name: 'Products',
            icon: 'crown',
            routes: [
              {
                path: '/product-module/products',
                name: 'Products',
                icon: 'smile',
                hideChildren: true,
                routes: [
                  {
                    path: '/product-module/products',
                    name: 'Product List',
                    icon: 'smile',
                    component: './ProductModule/Products/List',
                  },
                  {
                    path: '/product-module/products/Create',
                    name: 'Create Product',
                    icon: 'smile',
                    component: './ProductModule/Products/Create',
                  },
                  {
                    path: '/product-module/products/:id',
                    name: 'View Product',
                    icon: 'smile',
                    component: './ProductModule/Products/View',
                  },
                  {
                    path: '/product-module/products/:id/variation/Create',
                    name: 'Create Variation',
                    icon: 'smile',
                    component: './ProductModule/Products/Create/variation',
                  },
                ],
              },
              {
                path: '/product-module/brands',
                name: 'Brands',
                icon: 'smile',
                component: './ProductModule/Brands',
                // authority: ['admin'],
              },
              {
                path: '/product-module/outlets',
                name: 'Outlets',
                icon: 'smile',
                component: './ProductModule/Outlets',
                // authority: ['admin'],
              },
              {
                path: '/product-module/categories',
                name: 'Categories',
                icon: 'smile',
                component: './ProductModule/Categories',
                // authority: ['admin'],
              },
              {
                path: '/product-module/attributes',
                name: 'Attributes',
                icon: 'smile',
                component: './ProductModule/Attributes',
                // authority: ['admin'],
              },
            ],
          },
          {
            path: '/procurement-module',
            name: 'Procurement',
            icon: 'crown',
            routes: [
              {
                path: '/procurement-module/supplier',
                name: 'Suppliers',
                icon: 'smile',
                hideChildren: true,
                routes: [
                  {
                    path: '/procurement-module/supplier',
                    name: 'Suppliers List',
                    icon: 'smile',
                    component: './ProductModule/Products/List',
                  },
                ],
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
