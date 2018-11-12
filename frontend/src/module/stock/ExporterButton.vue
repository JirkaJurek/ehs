<template>
  <v-btn @click.native="set" color="primary" dark class="mb-2">
    Výdejka
  </v-btn>
</template>

<script>
import { setType, setExporter } from "./index";
export default {
  name: "ExporterButton",
  data: () => ({}),
  created() {},
  computed: {},
  methods: {
    set() {
      setType(this.$store, 2);
      setExporter(this.$store, true);
    }
  }
};
</script>
