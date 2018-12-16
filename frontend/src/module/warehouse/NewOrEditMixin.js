const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

import DialogWarehouse from "./DialogWarehouse.vue";
export default {
  methods: {
    async editItem(id = 0) {
      let warehouse = {};
      if (id) {
        const result = await this.axios.get(`/warehouse/${id}`);
        warehouse = {
          ...result.data,
          accountableEmployee: toJson(result.data.accountableEmployee)
        };
      }
      this.$store.commit(
        "setComponent",
        <DialogWarehouse defaultItem={warehouse} id={id} />
      );
    }
  }
};
