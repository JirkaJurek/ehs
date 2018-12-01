<template>
  <div class="hello">
    {{ msg }}
    <button v-on:click="test">teste</button>
  </div>
</template>

<script>
import toolMixin from "../mixins/tool";
export default {
  name: "ToolSuper",
  props: {
    msg: String,
    data: Object
  },
  mixins: [toolMixin],
  methods: {
    test() {
      console.log('a')
      this.$emit("up", "cus");
    }
  },
  created() {
    console.log('ahoj');
    console.log(this.data);
  }
};
</script>
