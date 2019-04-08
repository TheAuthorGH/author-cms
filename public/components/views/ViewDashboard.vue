<template>
  <section class="view-dashboard">
    <section>
      <h2>Welcome!</h2>
    </section>
    <aside>
    </aside>
  </section>
</template>

<script>
export default {

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