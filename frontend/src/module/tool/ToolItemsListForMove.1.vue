<template>
  <v-data-table :items="items" hide-actions class="elevation-1">
    <template slot="headers" slot-scope="props">
      <tr>
        <th>Název nástroje</th>
        <th>Zaměstnanec</th>
        <th>Počet nových kusu</th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ getToolName(props.item.toolId) }}</td>
      <td class="text-xs-center">
        <span v-if="props.item.count > 0">
          {{ props.item.employee.name }}
        </span>
        <employee-select v-else v-on:change="(value) => {props.item.employee = value}" :multiple="false" />
      </td>
      <td class="text-xs-center">
        <v-text-field v-model="props.item.number" :min="0" @change="changeCount(props.item)" type="number"></v-text-field>
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
// tahle komponenta je potřeba celé překopat
import {
  append,
  applySpec,
  filter,
  find,
  flatten,
  head,
  map,
  pipe,
  prop,
  propEq,
  reject,
  sortBy
} from "ramda";
import { addAllItems } from "../stock";
import EmployeeSelect from "./EmployeeSelect";
export default {
  components: {
    "employee-select": EmployeeSelect
  },
  props: {
    tools: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    items: []
  }),
  computed: {
    // items() {
    //   return pipe(
    //     map(y =>
    //       pipe(
    //         prop("items"),
    //         this.toJson,
    //         append(
    //           {
    //             id_tool: y.id,
    //             count: 0,
    //             inStock: 0
    //           }
    //         )
    //       )(y)
    //     ),
    //     flatten,
    //     map(this.transformItem)
    //   )(this.tools);
    // }
  },
  watch: {
    tools(val) {
      this.init(val)
    }
  },
  created() {
    this.init(this.tools)
  },
  methods: {
    init(tools) {
      pipe(
        filter(x => !find(propEq("toolId", x.id), this.items)),
        map(x => {
          this.items.push({
            id_tool: x.id,
            toolId: x.id
          });
        })
      )(tools);
    },
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
      this.items = pipe(
        append({
          id_tool: item.toolId,
          toolId: item.toolId
        }),
        sortBy(prop("toolId"))
      )(this.items);
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