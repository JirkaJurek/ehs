<template>
  <v-icon small class="mr-2" @click="generatePdf(id)" title="Vygenerovat pdf">
    print
  </v-icon>
</template>

<script>
import Basic from "../../mixin/Basic";
export default {
  props:['id'],
  mixins: [Basic],
  auth(ability) {
    return ability.can("EditButton", "Warehouse");
  }
};
</script>
