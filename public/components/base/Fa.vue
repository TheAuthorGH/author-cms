<script>
export default {
  functional: true,
  props: {
    icon: {type: String, required: true},
    spin: {type: Boolean, default: false},
    fw: {type: Boolean, default: false}
  },
  render(createElement, {props}) {
    const classes = ['b-fa', 'fas'];
    classes.push('fa-' + props.icon);
    if(props.spin)
      classes.push('fa-spin');
    if(props.fw)
      classes.push('fa-fw');
    return createElement('span', {
      class: classes.join(' ')
    });
  }
};
</script>