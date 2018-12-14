<template>
  <div class="hello">
    <div id="toolCategories">
      <!--
      <sort-tree v-if=ifForRefresh ref='tree' :treeData="categories" :options="options" />
      -->
      <root-new-button />
      <v-treeview open-all :items="categories" activatable item-key="id" open-on-click>
        <template slot="append" slot-scope="{ item, open, leaf }">
          <new-button :id="item.id" />
        </template>
      </v-treeview>
    </div>
  </div>
</template>

<style>
#toolCategories .v-treeview-node__root {
  height: 100%;
  width: 350px;
}
</style>

<script>
import { NewButton, RootNewButton } from "../module/categories";
export default {
  components: {
    "new-button": NewButton,
    "root-new-button": RootNewButton
  },
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
        if (!this.ifForRefresh) {
          this.ifForRefresh = true;
        }
      }, 1000);
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