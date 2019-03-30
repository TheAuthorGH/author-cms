import cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    authToken: cookies.get('auth-token') || null
  },
  mutations: {
    setAuthToken(state, authToken) {
      state.authToken = authToken;
      cookies.set('auth-token', authToken);
    }
  },
  getters: {
    isUserAuthenticated(state) {
      return Boolean(state.authToken);
    }
  },
  actions: {
    async login(context, data) {
      const res = await axios.post('/api/auth', data);
      context.commit('setAuthToken', res.data);
    },
    async logout(context) {
      context.commit('setAuthToken', null);
    }
  },
};