<template>
  <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový sklad</v-btn>
</template>

<script>
import Basic from "../../mixin/Basic";
export default {
  mixins: [Basic],
  auth(ability) {
    return ability.can("NewButton", "Warehouse");
  }
};
</script>
