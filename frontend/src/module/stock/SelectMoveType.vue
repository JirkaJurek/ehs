<template>
  <v-select :items="possibleTypes" :value="moveType" @change="setMoveType" label="Typ" outline background-color="primary" />
</template>

<script>
import { getPossibleTypes, setType } from "./index";
export default {
  data: () => ({}),
  computed: {
    moveType() {
      return this.$store.state.stock.moveItems.type;
    },
    possibleTypes() {
      return getPossibleTypes(this.$store);
    }
  },
  methods: {
    setMoveType(value) {
      setType(this.$store, value);
    }
  }
};
</script>
