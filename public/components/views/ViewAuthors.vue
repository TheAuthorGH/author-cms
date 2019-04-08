<template>
  <section class="view-authors">
    <h2>Authors</h2>
    <promise :promise="authorIndexPromise">
      <template #default="{result}">
        <item-list :items="result">
          <template #noItems>
            <p>No Authors to show.</p>
          </template>
          <template #beforeItem="{item}">
            {{item.name}}
          </template>
        </item-list>
      </template>
    </promise>
  </section>
</template>

<script>
export default {
  data() {
    return {
      authorIndexPromise: null
    };
  },
  mounted() {
    this.authorIndexPromise = this.$store.dispatch('authors/getAuthorIndex');
  }
};
</script>

<style lang="scss">
.view-authors {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
