<template>
  <v-icon small class="mr-2" @click="editItem(id)" title="Editace">
    edit
  </v-icon>
</template>

<script>
import taskMixin from "../../mixins";
export default {
  props: ["id"],
  mixins: [taskMixin],
  // auth(ability) {
  //   return ability.can("EditButton", "Tool");
  // }
};
</script>
