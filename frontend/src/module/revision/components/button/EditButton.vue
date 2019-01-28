<template>
  <v-icon small class="mr-2" @click="editItem(defaultItem.id, defaultItem)">
    edit
  </v-icon>
</template>

<script>
import NewOrEditMixin from "../../mixins/TypeRevisionMixin";
export default {
  mixins: [NewOrEditMixin],
  props: ["defaultItem"],
  auth(ability) {
    return ability.can("EditButton", "Revision");
  }
};
</script>
