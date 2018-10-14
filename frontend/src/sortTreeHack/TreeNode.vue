<template>
  <div>
    <ul>
      <li v-for="(item) in nodeData" :key=item.id :data-id="item.id" v-show="showHide[item.id].nodeVisible">
        <span class="collapse-expand" v-if="showHide[item.id].nodeCL > 0" @click.stop='handleNodeExpand(item.id)'>
          {{ showHide[item.id].nodeExpand ? "+" : "-"}}
        </span>
        <div class="handle">
          <cell :d="item"></cell>
        </div>
        <v-btn fab dark small color="indigo" @click.stop="openModal(item.id)">
          <v-icon dark>add</v-icon>
        </v-btn>
        <tree-node v-if="item[treeOptions.childrenKey].length > 0" :includeInfo="includeInfo" :treeData="item[treeOptions.childrenKey]" :treeOptions="treeOptions">
        </tree-node>
      </li>
    </ul>
    <v-dialog v-model="isOpenDialog" max-width="290">
      <v-card>
        <v-flex xs12>
          <v-text-field v-model="newCategory.name" label="Name" outline></v-text-field>
        </v-flex>
        <v-btn @click="saveCategory()">save</v-btn>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
// pozor všechno se musí nadefinovat v index.js
export default {
  data: () => ({
    isOpenDialog: false,
    nodeData: [],
    showHide: [],
    newCategory: {}
  }),
  methods: {
    openModal(parentId) {
      this.newCategory = {
        parentId: parentId
      }
      this.isOpenDialog = true;
    },
    saveCategory() {
      this.isOpenDialog = false;
      this.$store.commit("newCategory", this.newCategory);
    }
  }
};
</script>