<template>
  <v-icon small @click="deleteItem(id)" title="Smazat">
    delete
  </v-icon>
</template>

<script>
import taskMixin from "../../mixins";
export default {
  props: ["id"],
  mixins: [taskMixin],
  auth(ability) {
    return ability.can("DeleteButton", "Tool");
  }
};
</script>
