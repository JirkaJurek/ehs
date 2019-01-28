const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

import { cond, equals, always, map, prop } from "ramda";
import { DialogTool } from "../components";
export default {
  methods: {
    async editItem(id = 0, duplicate = false) {
      const formTitle = cond([
        [equals(0), always("Nový nástroj")],
        [always(duplicate), always("Duplikace nástroje")],
        [always(true), always("Editace nástroje")]
      ])(id);

      let defaultItem = {
        inStock: 0,
        items: []
      };
      if (id > 0) {
        let { data } = await this.axios.get(`/tools/${id}`);
        defaultItem = {
          ...data,
          categories: toJson(data.categories),
          check: !!parseInt(data.check)
        };
        if (duplicate) {
          id = 0;
          defaultItem.inStock = 0;
          defaultItem.files = [];
          defaultItem.items = [];
        }
      }

      this.$store.commit(
        "setComponent",
        <DialogTool defaultItem={defaultItem} id={id} formTitle={formTitle} />
      );
    },
    async bulkDeleteItem(id, selected) {
      if (
        confirm(
          `Opravdu chcete smazat ${id ? "tuto položku" : "tyto položky"}?`
        )
      ) {
        const items = id ? [id] : map(prop("id"), selected);
        await this.axios.post("/tools/more-tools", {
          items
        });
        this.$store.dispatch("loadAllTool");
      }
    }
  }
};
