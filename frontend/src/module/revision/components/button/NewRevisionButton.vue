<template>
  <v-btn :disabled="bulk" @click.native="showDialogNewRevisions(0)" color="primary" class="mb-2">Nová revize</v-btn>
</template>

<script>
import TypeMixin from "../../mixins/TypeRevisionMixin";
export default {
  props: ["bulk"],
  mixins: [TypeMixin]
  // auth(ability) {
  //   return ability.can("NewButton", "Revision");
  // }
  // zatím se nepoužívá
};
</script>
