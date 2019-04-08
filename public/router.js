import cookies from 'js-cookie';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import ViewError from './components/views/ViewError';
import ViewLogin from './components/views/ViewLogin';
import ViewDashboard from './components/views/ViewDashboard';
import ViewAuthors from './components/views/ViewAuthors';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '', redirect: '/dashboard'},
    {path: '/error/:type', component: ViewError},
    {path: '/login', component: ViewLogin},
    {path: '/dashboard', component: ViewDashboard},
    {path: '/authors', component: ViewAuthors},
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