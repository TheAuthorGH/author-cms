<template>
  <div class="b-card">
    <div class="b-card-header">
      <slot name="header"/>
    </div>
    <section class="b-card-body">
      <slot/>
    </section>
  </div>
</template>

<style lang="scss">
.b-card {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  border: 1px #DDD solid;
  border-radius: 2px;

  .b-card-header {
    background-color: #EEE;
    padding: 0.5rem;
  }
  .b-card-body {
    padding: 0.5rem;
  }
}
</style>
