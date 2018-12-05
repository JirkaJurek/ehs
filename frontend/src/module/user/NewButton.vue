<template>
  <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový zaměstnanec</v-btn>
</template>

<script>
import NewOrEditMixin from "./NewOrEditMixin";
export default {
  mixins: [NewOrEditMixin]
};
</script>
