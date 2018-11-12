<template>
  <v-btn icon>
    <v-badge left>
      <span slot="badge">{{moveItems}}</span>
      <v-icon large @click="openModal()">
        store
      </v-icon>
    </v-badge>
  </v-btn>
</template>

<script>
import { addItem } from "./index";
import FullStockModal from "./FullStockModal";
export default {
  name: "ToolbarButton",
  data: () => ({}),
  created() {},
  computed: {
    moveItems() {
      return this.$store.getters.getNumberItems();
    }
  },
  methods: {
    openModal() {
      this.$store.commit("setMainModal", FullStockModal);
    }
  }
};
</script>
