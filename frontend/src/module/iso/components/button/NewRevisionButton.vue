<template>
  <v-btn
    color="blue darken-1"
    flat
    @click.native="addRevision(idIso)"
  >Nová revize</v-btn>
</template>

<script>
import BaseMixin from "../../mixins/base";

export default {
  props: ["idIso"],
  mixins: [BaseMixin]
};
</script>
