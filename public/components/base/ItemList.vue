<template>
  <div v-if="noItems" class="b-item-list">
    <slot name="noItems"/>
  </div>
  <ul v-else class="b-item-list">
    <li v-for="(item, index) in items" :key="index">
      <slot :item="item" :index="index" name="beforeItem"/>
      <slot :item="item" :index="index" name="afterItem"/>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {type: Array}
  },
  computed: {
    noItems() {
      return !this.items || !this.items.length;
    }
  }
};
</script>

<style lang="scss">
.b-item-list {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  border: 1px #DDD solid;
  border-radius: 2px;
  li {
    display: flex;
    padding: 0.5rem;
    &:nth-child(even) {
      background-color: #EEE;
    }
  }
}
</style>