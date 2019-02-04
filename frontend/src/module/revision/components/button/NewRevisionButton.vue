<template>
  <v-btn :color="color" :disabled="disabled" :flat="flat" @click.native="editItem(0, {}, selectedIds)">{{label}}</v-btn>
</template>

<script>
import RevisionMixin from "../../mixins/RevisionMixin";
export default {
  props: {
    selectedIds: Array,
    color: { type: String, default: "blue darken-1" },
    label: { type: String, default: "Nová revize" },
    flat: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false }
  },
  mixins: [RevisionMixin]
  // auth(ability) {
  //   return ability.can("NewButton", "Revision");
  // }
};
</script>
