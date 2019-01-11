<template>
  <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový zaměstnanec</v-btn>
</template>

<script>
import UserMixin from "./UserMixin";
export default {
  mixins: [UserMixin]
};
</script>
