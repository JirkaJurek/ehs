<template>
  <v-data-table :items="items" hide-actions class="elevation-1">
    <template slot="headers" slot-scope="props">
      <tr>
        <th>Název nástroje</th>
        <th>Sklad</th>
        <th>Počet kusu</th>
        <th v-if="type == 0">Cena kus bez DPH</th>
        <th v-if="type == 0">Dodavatel</th>
        <th v-if="type == 0">Číslo dokladu</th>
        <th v-if="type == 0">Datum nákupu</th>
        <th v-if="type == 0">Poznámka</th>
        <th v-if="type == 2">Vráceno kusu</th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ getToolName(props.item.toolId) }}</td>
      <td class="text-xs-center">{{ props.item.warehouse.name }}</td>
      <td class="text-xs-center">{{ props.item.number || props.item.count }}</td>
      <td v-if="type == 0" class="text-xs-center">{{ props.item.price }}</td>
      <td v-if="type == 0" class="text-xs-center">{{ props.item.supplier }}</td>
      <td v-if="type == 0" class="text-xs-center">{{ props.item.invoiceNumber }}</td>
      <td v-if="type == 0" class="text-xs-center">{{ props.item.purchaseDate }}</td>
      <td v-if="type == 0" class="text-xs-center">{{ props.item.description }}</td>
      <td class="text-xs-center" v-if="type == 2">{{ props.item.returned || 0 }}</td>
    </template>
    <template slot="no-data">
      <td colspan="4" class="text-xs-center">
        Žádná data
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { setType, setExporter } from "./index";
export default {
  name: "ExporterButton",
  props: ["items", "type"],
  data: () => ({}),
  created() {},
  computed: {},
  methods: {
    getToolName(toolId) {
      if (this.$store.state.tool.tools.length === 0) {
        this.$store.dispatch("loadAllTool");
      }

      return this.$store.getters.getToolNameById(toolId);
    }
  }
};
</script>
