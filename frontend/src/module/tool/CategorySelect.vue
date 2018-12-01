<template>
  <v-select v-bind="currentProps" :items="categories" @change="changeInner" item-text="name" item-value="id" ref="categorySelect" />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Kategorie"
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
    change: Function
  },
  computed: {
    categories() {
      return this.$store.state.tool.categories;
    },
    currentProps() {
      return this.$props;
    }
  },
  methods: {
    changeInner(values) {
      return this.change ? this.change(values) : this.$emit("change", values);
    },
    getData() {
      return this.$refs.categorySelect.selectedItems;
    }
  }
};
</script>