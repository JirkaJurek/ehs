<template>
  <div class="hello">
    <div class="tree">
      <sort-tree v-if=ifForRefresh ref='tree' :treeData="categories" :options="options" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    ifForRefresh: true,
    options: {
      sortKey: "order",
      parentKey: "parentId",
      childrenKey: "children"
    }
  }),
  created() {
    this.$store.dispatch("inicialize", ["categories"]);
  },
  computed: {
    categories() {
      this.ifForRefresh = false;
      setTimeout(() => {
        if(!this.ifForRefresh) {
          this.ifForRefresh = true;
        }
      }, 1000)
      return this.$store.getters.getCategoriesTransformTree();
    }
  },
  watch: {
    categories() {
      this.ifForRefresh = true;
    }
  },
  methods: {
    getdata() {
      this.formated = this.$refs.tree.reformatData();
    }
  }
};
</script>