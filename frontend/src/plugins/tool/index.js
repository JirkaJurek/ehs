import MyComponent from "./components/MyComponent.vue";
// import MyDirective from "./directives/MyDirective.js";

const Tool = {
  install(Vue, options) {
    Vue.component("tool-super", MyComponent);
    // Vue.directive(MyDirective.name, MyDirective);
    Vue.mixin({
      mounted() {
        console.log("Mounted!");
      }
    });
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(Tool);
}

export default Tool;
