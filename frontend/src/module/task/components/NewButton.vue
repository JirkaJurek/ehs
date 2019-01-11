<template>
  <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový úkol</v-btn>
</template>

<script>
import taskMixin from "../mixins";
export default {
  mixins: [taskMixin],
  auth(ability) {
    return ability.can("NewButton", "Task");
  }
};
</script>
