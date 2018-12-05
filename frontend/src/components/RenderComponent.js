export default {
  props: ["component"],
  functional: true,
  render(createElement, { props }) {
    return props.component;
  }
};
