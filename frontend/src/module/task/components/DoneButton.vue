<template>
  <v-icon class="mr-2" small @click="doneItem(id)" title="Označit jako vyřešený">
    done
  </v-icon>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    async doneItem(id) {
      if (confirm(`Opravdu chcete tento úkol označit jako vyřešený?`)) {
        await this.axios.post(`/task/${id}/change`, {
          type: "done"
        });
        this.$store.dispatch("loadAllTasks", true);
      }
    }
  }
};
</script>
