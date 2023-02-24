import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'umi练习',
  routes: [
    { path: '/login', component: '@/pages/login' },
    {
      component: '@/layouts/index',
      exact: false,
      wrappers: ['@/wrappers/auth'],
      routes: [
        {
          path: '/',
          component: '@/pages/home',
          wrappers: ['@/wrappers/auth'],
        },
        {
          path: '/deleteDemo',
          component: '@/pages/deleteDemo',
          exact: true,
          wrappers: ['@/wrappers/auth'],
        },
        {
          path: '/taskDemo',
          component: '@/pages/taskDemo',
          exact: true,
          wrappers: ['@/wrappers/auth'],
        },
        {
          path: '/proForm',
          component: '@/pages/antdDesignPro',
          exact: true,
          wrappers: ['@/wrappers/auth'],
        },
        {
          path: '/listDem',
          component: '@/pages/home',
          exact: true,
          wrappers: ['@/wrappers/auth'],
        },
        {
          path: '/listDem/createItem',
          component: '@/pages/home/createItem',
          exact: true,
          wrappers: ['@/wrappers/auth'],
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
  locale: {
    default: 'zh-CN', // 工程默认语言
    antd: true,
  },
});
