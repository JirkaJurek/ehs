<template>
  <v-data-table :items="moveItems.items" hide-actions class="elevation-1">
    <template slot="headers" slot-scope="props">
      <tr>
        <th>Název nástroje</th>
        <th>Sklad</th>
        <th>Počet kusu</th>
        <th v-if="moveType === 0">Cena kus bez DPH</th>
        <th v-if="moveType === 0">Dodavatel</th>
        <th v-if="moveType === 0">Číslo dokladu</th>
        <th v-if="moveType === 0">Datum nákupu</th>
        <th>Akce</th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ getToolName(props.item.toolId) }}</td>
        <td class="text-xs-center">{{ props.item.warehouse.name }}</td>
        <td class="text-xs-center">{{ props.item.number }}</td>
        <td v-if="moveType === 0" class="text-xs-center">{{ props.item.price }}</td>
        <td v-if="moveType === 0" class="text-xs-center">{{ props.item.supplier }}</td>
        <td v-if="moveType === 0" class="text-xs-center">{{ props.item.invoiceNumber }}</td>
        <td v-if="moveType === 0" class="text-xs-center">{{ props.item.purchaseDate }}</td>
        <td class="text-xs-center">
          <v-btn flat icon @click="deleteItem(props.index)">
            <v-icon>delete</v-icon>
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
import { deleteItemByIndex } from "../stock";
import { append, map, pipe, flatten, reject } from "ramda";
export default {
  props: {},
  data: () => ({}),
  computed: {
    moveItems() {
      return this.$store.state.stock.moveItems;
    },
    moveType() {
      return this.$store.state.stock.moveItems.type;
    },
  },
  watch: {},
  created() {},
  methods: {
    getToolName(toolId) {
      return this.$store.getters.getToolNameById(toolId);
    },
    deleteItem(index) {
      deleteItemByIndex(this.$store, index);
    }
  }
};
</script>