<template>
  <v-btn :disabled="bulk" @click.native="deleteItem(0, selected)" color="primary" class="mb-2">Smazat</v-btn>
</template>

<script>
import taskMixin from "../../mixins";
export default {
  props: ["selected", "bulk"],
  mixins: [taskMixin],
  auth(ability) {
    return ability.can("DeleteButton", "Tool");
  }
};
</script>
