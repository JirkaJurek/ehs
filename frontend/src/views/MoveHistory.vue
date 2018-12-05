<template>
  <v-data-table :items="moveStock" class="elevation-1" :rows-per-page-items="rowsItem">
    <template slot="headers" slot-scope="props">
      <tr>
        <th>Typ</th>
        <th>Upřesnění</th>
        <th>Datum</th>
        <th>Akce</th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.exporter == 0 ? 'Přijemka' : 'Výdejka' }}</td>
      <td class="text-xs-center">{{ getType(props.item.type) }}</td>
      <td class="text-xs-center">{{ dateFormat(props.item.createdAt) }}</td>
      <td class="text-xs-center">
        <v-btn flat icon @click="detail(props.item)" title="detail">
          <v-icon>remove_red_eye</v-icon>
        </v-btn>
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
import { format } from "date-fns";
import { pipe, prop, propEq, find } from "ramda";
import { types, getMoveDetail } from "../module/stock/index";
export default {
  data: () => ({
    rowsItem: [25, 50, 100, { text: "vše", value: -1 }]
  }),
  computed: {
    moveStock() {
      return this.$store.state.stock.moveStock;
    }
  },
  watch: {},
  created() {
    this.$store.dispatch("allMoveStock");
  },
  methods: {
    getType(value) {
      return pipe(find(propEq("value", parseInt(value))), prop("text"))(types);
    },
    detail(item) {
      getMoveDetail(this.$store, item);
    },
    dateFormat(date) {
      return format(date, "DD. MM. YY");
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