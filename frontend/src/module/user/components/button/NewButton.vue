<template>
  <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový zaměstnanec</v-btn>
</template>

<script>
import BaseMixin from "../../mixin/base";
export default {
  mixins: [BaseMixin],
  auth(ability) {
    return ability.can("NewButton", "User");
  }
};
</script>
