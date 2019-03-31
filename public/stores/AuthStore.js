import cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    authToken: cookies.get('auth-token') || null,
    user: null
  },
  mutations: {
    setAuthToken(state, authToken) {
      state.authToken = authToken;
      if(authToken) {
        cookies.set('auth-token', authToken);
      } else {
        cookies.remove('auth-token');
      }
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  getters: {
    isUserAuthenticated(state) {
      return Boolean(state.authToken);
    }
  },
  actions: {
    async login(context, data) {
      let res = await axios.post('/api/auth', data);
      context.commit('setAuthToken', res.data);
      res = await axios.post('/api/auth/user', null, {
        headers: {Authorization: `Bearer ${context.state.authToken}`}        
      });
      context.commit('setUser', res.data);
    },
    async logout(context) {
      context.commit('setAuthToken', null);
    },
    async refresh(context) {
      const res = await axios.post('/api/auth/refresh', null, {
        headers: {Authorization: `Bearer ${context.state.authToken}`}
      });
      context.commit('setAuthToken', res.data);
    }
  },
};