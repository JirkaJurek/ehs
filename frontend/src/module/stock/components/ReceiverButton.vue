<template>
  <v-btn @click.native="set" color="primary" dark class="mb-2">
    Přijemka
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
      this.$router.push('/fe/move-in-stock');
    }
  },
  auth(ability) {
    return ability.can("ReceiverAndExporter", "Stock");
  }
};
</script>
