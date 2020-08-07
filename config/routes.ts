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
                    path: '/product-module/products/create',
                    name: 'Create Product',
                    icon: 'smile',
                    component: './ProductModule/Products/Create',
                  },
                  {
                    path: '/product-module/products/update/:id',
                    name: 'Create Product',
                    icon: 'smile',
                    component: './ProductModule/Products/Create',
                  },
                  {
                    path: '/product-module/products/:id/variations/create',
                    name: 'Create Variation',
                    icon: 'smile',
                    component: './ProductModule/Products/Create/variation',
                  },
                  {
                    path: '/product-module/products/:id',
                    name: 'View Product',
                    icon: 'smile',
                    component: './ProductModule/Products/View',
                  },
                  {
                    path: '/product-module/products/:id/:vid',
                    name: 'View Product',
                    icon: 'smile',
                    component: './ProductModule/Products/View',
                  },
                ],
              },
              {
                path: '/product-module/brands',
                name: 'Brands',
                icon: 'smile',
                hideChildren: true,
                routes: [
                  {
                    path: '/product-module/brands',
                    name: 'Brands',
                    icon: 'smile',
                    component: './ProductModule/Brands',
                  },
                  {
                    path: '/product-module/brands/create',
                    name: 'Create Brands',
                    icon: 'smile',
                    component: './ProductModule/Brands/Create',
                  },
                  {
                    path: '/product-module/brands/update/:id',
                    name: 'Update Brands',
                    icon: 'smile',
                    component: './ProductModule/Brands/Create',
                  },
                ],
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
                hideChildren: true,
                // authority: ['admin'],
                routes: [
                  {
                    path: '/product-module/categories',
                    name: 'Categories List',
                    icon: 'smile',
                    component: './ProductModule/Categories',
                  },
                  {
                    path: '/product-module/categories/create',
                    name: 'Create Category',
                    icon: 'smile',
                    component: './ProductModule/Categories/Create',
                  },
                  {
                    path: '/product-module/categories/update/:id',
                    name: 'Update Category',
                    icon: 'smile',
                    component: './ProductModule/Categories/Create',
                  },
                ],
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
                path: '/procurement-module/suppliers',
                name: 'Suppliers',
                icon: 'smile',
                hideChildren: true,
                routes: [
                  {
                    path: '/procurement-module/suppliers',
                    name: 'Suppliers List',
                    icon: 'smile',
                    component: './ProcurementModule/Suppliers',
                  },
                  {
                    path: '/procurement-module/suppliers/create',
                    name: 'Create Supplier',
                    icon: 'smile',
                    component: './ProcurementModule/Suppliers/Create',
                  },
                  {
                    path: '/procurement-module/suppliers/update/:id',
                    name: 'Update Supplier',
                    icon: 'smile',
                    component: './ProcurementModule/Suppliers/Create',
                  },
                ],
              },
            ],
          },
          {
            path: '/stock-control-module',
            name: 'Stock Control',
            icon: 'smile',
            hideChildren: true,
            routes: [
              {
                path: '/stock-control-module',
                name: 'ConList',
                icon: 'smile',
                component: './StockControl',
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
