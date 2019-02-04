<template>
  <v-icon small class="mr-2" @click="editItem(id, true)" title="Klonovat">
    filter_none
  </v-icon>
</template>

<script>
import taskMixin from "../../mixins";
export default {
  props: ["id"],
  mixins: [taskMixin]
  // auth(ability) {
  //   return ability.can("CloneButton", "Tool");
  // }
};
</script>
