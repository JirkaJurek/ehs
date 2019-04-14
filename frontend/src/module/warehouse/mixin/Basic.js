const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

import { DialogWarehouse } from "../components";
import { pick, pipe, map, prop, apply, sum } from "ramda";
import { renameKeys } from "ramda-adjunct";
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
    },
    async generatePdf(id) {
      const warehouseResult = await this.axios.get(`/warehouse/${id}`);
      const warehouse = {
        ...warehouseResult.data,
        accountableEmployee: toJson(warehouseResult.data.accountableEmployee)
      };
      const toolsResult = await this.axios.get(`/tools`, {
        params: { filter: { warehouse: [id] } }
      });
      const tools = map(
        pipe(
          pick(["seriesNumber", "name", "machineNumber", "code", "items"]),
          renameKeys({
            seriesNumber: "s",
            name: "n",
            machineNumber: "m",
            code: "c",
            items: "i"
          }),
          tool => {
            let count = 0;
            const toolItems = toJson(tool.i);
            if (toolItems) {
              count = pipe(
                map(prop("count")),
                apply(sum)
              )(toolItems);
            }
            return { ...tool, q: count };
          }
        ),
        toolsResult.data
      );
      const other = {
        w: `${warehouse.number} - ${warehouse.name}`,
        n: `${warehouse.accountableEmployee.degree} ${
          warehouse.accountableEmployee.firstName
        } ${warehouse.accountableEmployee.lastName}`
      };
      window.open(
        `${location.protocol}//${location.hostname}:3031/files/pdf.1.html?other=${JSON.stringify(
          other
        )}&items=${JSON.stringify(tools)}`,
        "_blank"
      );
    }
  }
};
