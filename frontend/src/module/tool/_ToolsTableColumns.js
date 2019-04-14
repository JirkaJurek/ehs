export default {
  functional: true,
  props: {
    visibleColumns: {
      type: Function
    },
    item: {
      type: String
    },
    visibleActions: {
      type: Array
    }
  },
  test: '',
  render(createElement, a) {
    const {props} = a;
    console.log(a)
    console.log('ahoj2')
    return <div>{props.visibleColumns(props.item)}{props.item}</div>;
  }
};
