import Vue from 'vue';
import Vuex from 'vuex';
window.Vuex = Vuex;

Vue.use(Vuex);

import AuthStore from './stores/AuthStore';

export default new Vuex.Store({
  modules: {
    auth: AuthStore
  }
});