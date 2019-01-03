<template>
  <v-btn @click.native="addFulfillmentItem()" color="primary" dark class="mb-2">Nový zápis</v-btn>
</template>

<script>
import DialogTaskFulfillment from "../components/DialogTaskFulfillment.vue";
export default {
  props: ["task"],
  methods: {
    addFulfillmentItem() {
      this.$store.commit(
        "setComponent",
        <DialogTaskFulfillment task={this.task} />
      );
    }
  }
};
</script>
