import Vue from 'vue';
import Vuex from 'vuex';
window.Vuex = Vuex;

Vue.use(Vuex);

const requireModule = require.context('./stores', false, /[^\.js]$/);
const moduleKeys = _.map(requireModule.keys(), _.kebabCase);

export default new Vuex.Store({
  modules: {
    ..._.zipObject(
      moduleKeys,
      _.map(moduleKeys, key => requireModule('./' + key).default)
    )
  },
  state: {
    globalLoading: true
  },
  mutations: {
    setGlobalLoading(state, loading) {
      state.globalLoading = loading;
    }
  },
  actions: {
    async init(context) {
      for(let module of moduleKeys) {
        await context.dispatch(`${module}/init`);
      }
      context.commit('setGlobalLoading', false);
    }
  }
});