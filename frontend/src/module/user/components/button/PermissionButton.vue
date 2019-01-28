<template>
  <v-icon small class="mr-2" @click="userPermission(id)" title="Oprávnění">
    security
  </v-icon>
</template>

<script>
import BaseMixin from "../../mixin/base";
export default {
  props:['id'],
  mixins: [BaseMixin],
  auth(ability) {
    return ability.can("PermissionButton", "User");
  }
};
</script>
