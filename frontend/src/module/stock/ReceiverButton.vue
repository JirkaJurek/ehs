<template>
  <v-btn @click.native="set" color="primary" dark class="mb-2">
    Přijímka
  </v-btn>
</template>

<script>
import { cleanMove, setType, setExporter } from "./index";
export default {
  name: "ReceiverButton",
  data: () => ({}),
  created() {},
  computed: {},
  methods: {
    set() {
      cleanMove(this.$store);
      setType(this.$store, 0);
      setExporter(this.$store, 0);
      this.$router.push('/move-in-stock');
    }
  }
};
</script>
