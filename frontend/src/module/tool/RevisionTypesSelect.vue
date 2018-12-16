<template>
  <v-select v-bind="currentProps" :items="revisionTypes" @change="changeInner" item-text="name" item-value="id" />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Typy revizí"
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
    }
  },
  created() {
    this.$store.dispatch("inicialize", ["loadAllRevisionType"]);
  },
  computed: {
    revisionTypes() {
      return this.$store.state.tool.revisionType;
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