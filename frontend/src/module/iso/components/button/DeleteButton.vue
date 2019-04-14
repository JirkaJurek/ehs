<template>
  <v-icon
    small
    @click="deleteItem(type, id)"
    title="Smazat"
  >
    delete
  </v-icon>
</template>

<script>
export default {
  props: ["type", "id"],
  methods: {
    async deleteItem(type, id) {
      if (confirm(`Opravdu chcete smazat tento ISO soubor?`)) {
        await this.axios.delete(`/iso/${id}`);
        this.$store.dispatch("loadAllIso", { reload: true, types: [type] });
      }
    }
  },
  auth(ability) {
    return ability.can("DeleteButton", "ISO");
  }
};
</script>
