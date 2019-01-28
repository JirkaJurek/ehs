import DialogTask from "../components/DialogTask.vue";
import DialogTaskFulfillmentList from "../components/DialogTaskFulfillmentList.vue";
const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};
export default {
  methods: {
    async editItem(id = 0) {
      let task = {};
      if (id) {
        const result = await this.axios.get(`/task/${id}`);
        task = {
          ...result.data,
          resolver: toJson(result.data.resolver),
          submitter: toJson(result.data.submitter)
        };
      }
      this.$store.commit(
        "setComponent",
        <DialogTask defaultItem={task} id={id} />
      );
    },
    listFulfillment(task) {
      this.$store.commit(
        "setComponent",
        <DialogTaskFulfillmentList task={task} />
      );
    },
    async deleteItem(id) {
      if (confirm(`Opravdu chcete smazat tento úkol?`)) {
        await this.axios.delete(`/task/${id}`);
        this.$store.dispatch("loadAllTasks", { reload: true });
      }
    }
  }
};
