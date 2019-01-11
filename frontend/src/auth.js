import { path } from "ramda";
export const auth = Component => ({
  functional: true,
  render(h, context) {
    const ability = path(["parent", "$ability"], context);
    if (ability && Component.auth && Component.auth(ability)) {
      return <Component />;
    } else {
      return null;
    }
  }
});

/*
export default {
  functional: true,
  props: ["permission"],
  render(h, context) {
    if (context.parent.$root.permissions[context.props.permission]) {
      return context.children;
    } else {
      return null;
    }
  }
};
*/
