<template>
  <v-icon small class="mr-2" @click="userPermission(id)" title="Oprávnění">
    security
  </v-icon>
</template>

<script>
import UserMixin from "./UserMixin";
export default {
  props:['id'],
  mixins: [UserMixin]
};
</script>
