<template>
  <v-select v-bind="currentProps" :items="items" @change="changeInner" />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Stav úkolu"
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
      return [{value:1, text:"Zadáno"},{value:2, text:"V řešení"},{value:3, text:"Dokončeno"}];
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