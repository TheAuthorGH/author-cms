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
  actions: {
    async attemptLogin(context, data) {
      const res = await axios.post('/api/auth', data)
      context.commit('setAuthToken', res.data);
    }
  },
};