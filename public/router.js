import cookies from 'js-cookie';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import ViewLogin from './components/views/ViewLogin';
import ViewDashboard from './components/views/ViewDashboard';
import ViewError from './components/views/ViewError';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/login', component: ViewLogin},
    {path: '/dashboard', component: ViewDashboard},
    {path: '/error/:type', component: ViewError},
    {path: '*', redirect: '/error/404'}
  ]
});

router.beforeEach((to, from, next) => {
  if(to.path !== '/login' && !cookies.get('auth-token')) {
    next('/login');
  }
  next();
});

export default router;