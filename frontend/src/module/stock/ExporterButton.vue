<template>
  <v-btn @click.native="set" color="primary" dark class="mb-2">
    Výdejka
  </v-btn>
</template>

<script>
import { cleanMove, setType, setExporter } from "./index";
export default {
  name: "ExporterButton",
  data: () => ({}),
  created() {},
  computed: {},
  methods: {
    set() {
      cleanMove(this.$store);
      setType(this.$store, 2);
      setExporter(this.$store, true);
      this.$router.push('/move-in-stock');
    }
  }
};
</script>
