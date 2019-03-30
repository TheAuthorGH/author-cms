<template>
  <div id="app">
    <section role="region">
    </section>
    <section class="centerpiece" role="region">
      <header>
        <h1>AuthorCMS</h1>
        <AuthNav/>
      </header>
      <main role="main">
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
  }
};
</script>

<style lang="scss">
body {
  height: 100vh;
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
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>