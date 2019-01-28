<template>
  <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový sklad</v-btn>
</template>

<script>
import NewOrEditMixin from "../../mixin/NewOrEditMixin";
export default {
  mixins: [NewOrEditMixin],
  auth(ability) {
    return ability.can("NewButton", "Warehouse");
  }
};
</script>
