<template>
  <v-btn
    @click.native="editItem(type)"
    color="primary"
    dark
    class="mb-2"
  >Nový soubor</v-btn>
</template>

<script>
import BaseMixin from "../../mixins/base";
export default {
  props: ["type"],
  mixins: [BaseMixin],
  auth(ability) {
    return ability.can("NewButton", "ISO");
  }
};
</script>
