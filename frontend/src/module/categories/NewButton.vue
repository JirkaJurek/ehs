<template>
  <v-btn fab dark small color="indigo" @click="newCategory(id)">
    <v-icon dark>add</v-icon>
  </v-btn>
</template>

<script>
import BaseMixin from "./BaseMixin";
export default {
  props: ["id"],
  mixins: [BaseMixin]
};
</script>
