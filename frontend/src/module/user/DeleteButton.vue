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
          `Opravdu chcete smazat tohoto zaměstnance?`
        )
      ) {
        await this.axios.delete(`/users/${id}`);
        this.$store.dispatch("loadAllUsers", true);
      }
    }
  }
};
</script>
