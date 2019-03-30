import './styles/reset';
import './styles/base';

import axios from 'axios';
window.axios = axios;

import store from './store';
import router from './router';
import Vue from 'vue';
import App from './App';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});