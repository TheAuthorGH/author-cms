<template>
  <nav class="auth-nav">
    <template v-if="isUserAuthenticated">
      <span v-if="user">Logged in as {{user.username}}</span>
      <a @click="logout()"><fa icon="user"/> Logout</a>
    </template>
  </nav>
</template>

<script>
export default {
  computed: {
    ...Vuex.mapGetters({
      isUserAuthenticated: 'auth/isUserAuthenticated'
    }),
    ...Vuex.mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss">
.auth-nav {
  display: flex;
}
</style>