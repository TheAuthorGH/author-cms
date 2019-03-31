import cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    authToken: null,
    user: null
  },
  mutations: {
    setAuthToken(state, authToken) {
      state.authToken = authToken;
      if(authToken) {
        cookies.set('auth-token', authToken);
        axios.defaults.headers.common.authorization = `Bearer ${authToken}`;
      } else {
        cookies.remove('auth-token');
        delete axios.defaults.headers.common.authorization;
      }
    },
    setUserData(state, user) {
      state.user = user;
    }
  },
  getters: {
    isUserAuthenticated(state) {
      return Boolean(state.authToken);
    }
  },
  actions: {
    async init(context) {
      const authToken = cookies.get('auth-token');
      if(authToken) {
        context.commit('setAuthToken', authToken);
        await context.dispatch('refresh');
        await context.dispatch('getUserData');
      }
    },
    async login(context, data) {
      const res = await axios.post('/api/auth', data);
      context.commit('setAuthToken', res.data);
      await context.dispatch('getUserData');
    },
    async logout(context) {
      context.commit('setAuthToken', null);
    },
    async refresh(context) {
      const res = await axios.post('/api/auth/refresh', null);
      context.commit('setAuthToken', res.data);
    },
    async getUserData(context) {
      const res = await axios.get('/api/auth/user');
      context.commit('setUserData', res.data);
    }
  },
};