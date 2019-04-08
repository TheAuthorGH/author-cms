<template>
  <div v-if="globalLoading" id="app-loading">
    <loading/>
  </div>
  <div v-else id="app">
    <section>
    </section>
    <section class="centerpiece">
      <header>
        <h1>AuthorCMS</h1>
        <AuthNav/>
      </header>
      <main>
        <router-view/>
      </main>
    </section>
  </div>
</template>

<script>
import AuthNav from './components/AuthNav';

export default {
  components: {
    AuthNav
  },
  computed: {
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

  > .loading {
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
    padding: 1rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>