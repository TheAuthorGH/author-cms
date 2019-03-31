import './styles/reset';
import './styles/base';

import axios from 'axios';
window.axios = axios;

import lodash from 'lodash';
window.lodash = lodash;

import store from './store';
import router from './router';
import Vue from 'vue';
import App from './App';

const requireComponent = require.context('./components/base');
for(let file of _.reject(requireComponent.keys(), file => _.endsWith(file, '.vue'))) {
  Vue.component(_.kebabCase(file), requireComponent(file).default);
}

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});