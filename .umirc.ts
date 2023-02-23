import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/login' },
    {
      component: '@/layouts/index',
      exact: false,
      routes: [
        {
          path: '/',
          component: '@/pages/home',
        },
        {
          path: '/deleteDemo',
          component: '@/pages/deleteDemo',
          exact: true,
        },
        {
          path: '/taskDemo',
          component: '@/pages/taskDemo',
          exact: true,
        },
        {
          path: '/proForm',
          component: '@/pages/antdDesignPro',
          exact: true,
        },
        {
          path: '/listDem',
          component: '@/pages/home',
          exact: true,
        },
        {
          path: '/listDem/createItem',
          component: '@/pages/home/createItem',
          exact: true,
        },
      ],
    },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
