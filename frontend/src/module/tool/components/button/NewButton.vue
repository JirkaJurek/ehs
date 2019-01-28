<template>
    <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový nástroj</v-btn>
</template>

<script>
import taskMixin from "../../mixins";
export default {
  props: ["id"],
  mixins: [taskMixin],
  auth(ability) {
    return ability.can("NewButton", "Tool");
  }
};
</script>
