<template>
  <v-icon small class="mr-2" @click="editItem(id)" title="Editace">
    edit
  </v-icon>
</template>

<script>
import NewOrEditMixin from "../../mixin/NewOrEditMixin";
export default {
  props:['id'],
  mixins: [NewOrEditMixin],
  auth(ability) {
    return ability.can("EditButton", "Warehouse");
  }
};
</script>
