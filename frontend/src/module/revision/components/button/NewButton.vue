<template>
  <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový typ revize</v-btn>
</template>

<script>
import NewOrEditMixin from "../../mixins/TypeRevisionMixin";
export default {
  mixins: [NewOrEditMixin],
  auth(ability) {
    return ability.can("NewButton", "Revision");
  }
};
</script>
