<template>
  <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový mobil</v-btn>
</template>

<script>
import BaseMixin from "../../mixins/base";
export default {
  mixins: [BaseMixin],
  auth(ability) {
    return ability.can("NewButton", "MobileTariffs");
  }
};
</script>
