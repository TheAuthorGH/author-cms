import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import ViewLogin from './views/ViewLogin';

export default new VueRouter({
  mode: 'history',
  routes: [
    {path: '/login', component: ViewLogin}
  ]
});