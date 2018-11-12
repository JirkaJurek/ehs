<template>
  <v-btn @click.native="set" color="primary" dark class="mb-2">
    Přijímka
  </v-btn>
</template>

<script>
import { setType, setExporter } from "./index";
export default {
  name: "ReceiverButton",
  data: () => ({}),
  created() {},
  computed: {},
  methods: {
    set() {
      setType(this.$store, 0);
      setExporter(this.$store, 0);
    }
  }
};
</script>
