<template>
  <v-icon small @click="deleteItem(id)">
    delete
  </v-icon>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    async deleteItem(id) {
      if (confirm(`Opravdu chcete smazat tento typ revize?`)) {
        await this.axios.delete(`/tools/revision-type/${id}`)
        this.$store.dispatch("inicialize", ["loadAllRevisionType"]);
      }
    }
  },
  auth(ability) {
    return ability.can("DeleteButton", "Revision");
  }
};
</script>
