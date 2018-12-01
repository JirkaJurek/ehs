<template>
  <v-data-table :items="items" hide-actions class="elevation-1">
    <template slot="headers" slot-scope="props">
      <tr>
        <th>Název nástroje</th>
        <th>Zaměstnanec</th>
        <th>Celkový počet</th>
        <th>Skladem</th>
        <th>Počet kusu</th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ getToolName(props.item.toolId) }}</td>
      <td class="text-xs-center">{{ props.item.employee.name }}</td>
      <td class="text-xs-center">{{ props.item.count }}</td>
      <td class="text-xs-center">{{ props.item.inStock }}</td>
      <td class="text-xs-center">
        <v-text-field v-model="props.item.number" :min="0" @change="changeCount(props.item)" :max="props.item.count - props.item.inStock" :rules="numberRules(props.item.count - props.item.inStock)" type="number"></v-text-field>
      </td>
    </template>
    <template slot="no-data">
      <td colspan="4" class="text-xs-center">
        Žádná data
      </td>
    </template>
  </v-data-table>
</template>


<script>
import { append, map, pipe, flatten, reject, sortBy, prop } from "ramda";
import { addAllItems } from "../stock";
export default {
  props: {
    tools: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({}),
  computed: {
    items() {
      return pipe(
        map(x => this.toJson(x.items)),
        flatten,
        map(this.transformItem)
      )(this.tools);
    }
  },
  watch: {},
  created() {},
  methods: {
    changeCount(item) {
      addAllItems(
        this.$store,
        pipe(
          reject(
            x => x.toolId == item.toolId && x.employee.id == item.employee.id
          ),
          append(item),
          sortBy(prop("toolId"))
        )(this.$store.state.stock.moveItems.items)
      );
    },
    numberRules(max) {
      return [v => v <= max || "Počet položek neodpovídá skladu"];
    },
    getToolName(toolId) {
      return this.$store.getters.getToolNameById(toolId);
    },
    transformItem(item) {
      return {
        ...item,
        toolId: item.id_tool,
        employee: this.toJson(item.employee)
      };
    },
    toJson(data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
  }
};
</script>