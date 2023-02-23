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
          component: '@/pages/addDemo',
        },
        {
          path: '/addDemo',
          component: '@/pages/addDemo',
          exact: true,
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
          path: '/map',
          component: '@/pages/l7map',
          exact: true,
        },
      ],
    },
  ],
  fastRefresh: {},
});
