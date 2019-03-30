<template>
  <nav class="auth-nav">
    <template v-if="isUserAuthenticated">
      <a @click="logout()">Logout</a>
    </template>
    <router-link v-else to="/login">Login</router-link>
  </nav>
</template>

<script>
export default {
  computed: {
    ...Vuex.mapGetters({
      isUserAuthenticated: 'auth/isUserAuthenticated'
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