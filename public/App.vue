<template>
  <div v-if="globalLoading" id="app-loading">
    <loading/>
  </div>
  <div v-else id="app">
    <section v-if="isUserAuthenticated">
      <Sidebar/>
    </section>
    <section class="centerpiece">
      <header>
        <AuthNav/>
      </header>
      <main>
        <router-view/>
      </main>
    </section>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';
import AuthNav from './components/AuthNav';

export default {
  components: {
    Sidebar,
    AuthNav
  },
  computed: {
    ...Vuex.mapGetters({
      isUserAuthenticated: 'auth/isUserAuthenticated'
    }),
    ...Vuex.mapState(['globalLoading'])
  },
  created() {
    this.$store.dispatch('init');
  }
};
</script>

<style lang="scss">
body {
  height: 100vh;
}

#app-loading {
  display: flex;
  height: 100%;

  > .b-loading {
    margin: auto;
    font-size: 2rem;
  }
}

#app {
  display: flex;
  height: 100%;

  > section {
    display: flex;
    flex-direction: column;
  }
  .centerpiece {
    flex: 1;
    padding: 1rem 2rem;
    > header {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1rem;
    }
    > main {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
}
</style>