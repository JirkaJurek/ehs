<template>
  <v-icon small @click="deleteItem(id)" title="Smazat">
    delete
  </v-icon>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    async deleteItem(id) {
      if (
        confirm(
          `Opravdu chcete smazat tento sklad?`
        )
      ) {
        await this.axios.delete(`/warehouse/${id}`);
        this.$store.dispatch("loadAllWarehouses", true);
      }
    }
  }
};
</script>
