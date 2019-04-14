<template>
  <v-icon small class="mr-2" @click="editItem(id)" title="Editace">
    edit
  </v-icon>
</template>

<script>
import BaseMixin from "../../mixins/base";
export default {
  props:['id'],
  mixins: [BaseMixin],
  auth(ability) {
    return ability.can("EditButton", "MobileTariffs");
  }
};
</script>
