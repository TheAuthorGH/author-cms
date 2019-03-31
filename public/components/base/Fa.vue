<script>
export default {
  functional: true,
  props: {
    icon: {type: String, required: true},
    spin: {type: Boolean, default: false}
  },
  render(createElement, {props}) {
    const classes = ['fas'];
    classes.push('fa-' + props.icon);
    if(props.spin) {
      classes.push('fa-spin');
    }
    return createElement('span', {
      class: classes.join(' ')
    });
  }
};
</script>