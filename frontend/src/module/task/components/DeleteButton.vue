<template>
  <v-icon class="mr-2" small @click="deleteItem(id)" title="Smazat">
    delete
  </v-icon>
</template>

<script>
import taskMixin from "../mixins";
export default {
  props: ["id"],
  mixins: [taskMixin]
};
</script>
