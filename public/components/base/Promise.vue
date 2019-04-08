<template>
  <div class="b-promise">
    <slot v-if="result" :result="result"/>
    <slot v-if="error" name="error" :error="error"/>
    <slot v-if="!promise" name="noPromise"/>
    <slot v-if="promise && !result && !error" name="pending">
      <loading/>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    promise: {type: Promise}
  },
  data() {
    return {
      result: null,
      error: null
    };
  },
  watch: {
    promise(val) {
      this.handlePromise(val);
    }
  },
  methods: {
    async handlePromise(promise) {
      this.result = null;
      this.error = null;
      if(!promise) return;
      try {
        this.result = await promise;
      } catch(err) {
        this.error = err;
      }
    }
  }
};
</script>