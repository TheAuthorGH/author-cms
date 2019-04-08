<template>
  <section class="view-dashboard">
    <section>
      <h2>Stories</h2>
      <loading v-if="!storyIndex"/>
      <ul v-else>
        <li
          v-for="story in storyIndex"
          :key="story.slug"
          v-text="story.title"
        ></li>
      </ul>
    </section>
    <aside>
    </aside>
  </section>
</template>

<script>
export default {
  data() {
    return {
      storyIndex: null
    }
  },
  async mounted() {
    this.storyIndex = await this.$store.dispatch('stories/getStoryIndex');
  }
}
</script>

<style lang="scss">
.view-dashboard {
  display: flex;
  width: 100%;
  height: 100%;

  > section {
    flex: 1;
  }
  > aside {
    display: flex;
    flex-direction: column;
  }
}
</style>