<template>
  <v-select v-bind="currentProps" :items="items" @change="changeInner" />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Oblast úkolu"
    },
    multiple: {
      type: Boolean,
      default: true
    },
    "persistent-hint": {
      type: Boolean,
      default: true
    },
    "return-object": {
      type: Boolean,
      default: true
    },
    change: Function,
    value: {
      default: undefined
    },
    rules: Array
  },
  created() {},
  computed: {
    items() {
      return ["Vedení", "Výroba", "Obchod", "Servis", "Správní"];
    },
    employees() {
      return this.$store.state.user.users;
    },
    currentProps() {
      return this.$props;
    }
  },
  methods: {
    changeInner(values) {
      return this.change ? this.change(values) : this.$emit("change", values);
    }
  }
};
</script>