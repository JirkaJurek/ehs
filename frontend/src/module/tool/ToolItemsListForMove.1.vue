<template>
  <v-data-table :items="items" hide-actions class="elevation-1">
    <template slot="headers" slot-scope="props">
      <tr>
        <th>Název nástroje</th>
        <th>Sklad</th>
        <th>Počet nových kusu</th>
        <th>Cena kus bez DPH</th>
        <th>Dodavatel</th>
        <th>Číslo dokladu</th>
        <th>Datum nákupu</th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ getToolName(props.item.toolId) }}</td>
      <td class="text-xs-center">
        <span v-if="props.item.count > 0">
          {{ props.item.warehouse.name }}
        </span>
        <warehouse-select v-else v-on:change="(value) => {props.item.warehouse = value}" :multiple="false" />
      </td>
      <td class="text-xs-center">
        <v-text-field v-model="props.item.number" :min="0" @change="changeCount(props.item)" type="number"></v-text-field>
      </td>
      <td class="text-xs-center">
        <v-text-field v-model="props.item.price" :min="0" type="number"></v-text-field>
      </td>
      <td class="text-xs-center">
        <v-combobox v-model="props.item.supplier" :items="suppliers"></v-combobox>
      </td>
      <td class="text-xs-center">
        <v-text-field v-model="props.item.invoiceNumber"></v-text-field>
      </td>
      <td class="text-xs-center">
        <v-menu :close-on-content-click="false" v-model="purchaseDate" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
          <v-text-field slot="activator" v-model="props.item.purchaseDate" prepend-icon="event" readonly></v-text-field>
          <v-date-picker locale="cz" :first-day-of-week="1" v-model="props.item.purchaseDate" @input="purchaseDate = false"></v-date-picker>
        </v-menu>
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
// dodělat ukládání u dodavatele
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
import WarehouseSelect from "./WarehouseSelect";
export default {
  components: {
    "warehouse-select": WarehouseSelect
  },
  props: {
    tools: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    purchaseDate: false,
    items: []
  }),
  computed: {
    suppliers() {
      return this.$store.state.tool.suppliers;
    }
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
      this.init(val);
    }
  },
  created() {
    this.init(this.tools);
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
            x => x.toolId == item.toolId && x.warehouse.id == item.warehouse.id
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
        warehouse: this.toJson(item.warehouse)
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