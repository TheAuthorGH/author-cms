<template>
  <div class="app-sidebar">
    <h1>AuthorCMS</h1>
    <nav>
      <router-link to="/dashboard"><fa icon="tachometer-alt" fw/> Dashboard</router-link>
      <router-link to="/stories"><fa icon="book-open" fw/> Stories</router-link>
      <router-link to="/authors"><fa icon="user" fw/> Authors</router-link>
    </nav>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
.app-sidebar {
  display: flex;
  flex-direction: column;
  background-color: #151515;
  height: 100%;

  h1 {
    color: #FFF;
    text-align: center;
    padding: 0.5rem;
    margin-bottom: 1rem;

  }
  nav {
    display: flex;
    flex-direction: column;
    a {
      color: #EEE;
      font-weight: 100;
      padding: 0.75rem 1.25rem;
      &:hover {
        background-color: #222;
      }
      &.router-link-active {
        color: #FFF;
        background-color: #224;
        cursor: default;
      }
      > .b-fa {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
