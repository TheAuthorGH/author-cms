<template>
  <section class="view-error">
    <template v-if="error === '404'">
      <h2>Not Found</h2>
      <p>The resource you requested was not found.</p>
    </template>
  </section>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$route.params.type;
    }
  }
};
</script>

<style lang="scss">
.view-error {
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}
</style>