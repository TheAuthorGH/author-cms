<template>
  <form class="view-login" @submit.prevent="loginSubmitted()">
    <h2>Admin Panel</h2>
    <input v-model="loginInput.username" placeholder="Username"/>
    <input v-model="loginInput.password" placeholder="Password"/>
    <button type="submit" :disabled="!canSubmitLogin">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      loginInput: {
        username: null,
        password: null
      }
    };
  },
  computed: {
    canSubmitLogin() {
      return this.loginInput.username && this.loginInput.password;
    }
  },
  methods: {
    async loginSubmitted() {
      await this.$store.dispatch('auth/login', this.loginInput);
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style lang="scss">
.view-login {
  display: flex;
  flex-direction: column;
  > * {
    margin: 0.5rem;
  }
}
</style>