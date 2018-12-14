<template>
  <v-btn dark @click.stop="newCategory(null)">
    Nová kategorie
  </v-btn>
</template>

<script>
import BaseMixin from "./BaseMixin";
export default {
  mixins: [BaseMixin]
};
</script>
