<template>
  <div>
    <v-layout my-3 display-2 align-center justify-center>Přehled skladů</v-layout>
    <div xs12 color="white">
      <new-warehouse />
    </div>
    <v-data-table :search=search :headers="headers" :items="warehouses" class="elevation-1" item-key="id" hide-actions>
      <template slot="items" slot-scope="{item}">
        <tr>
          <td class="text-xs-center">{{ item.number }}</td>
          <td class="text-xs-center">{{ item.name }}</td>
          <td class="text-xs-center">{{ toJson(item.accountableEmployee) | employeeName }}</td>
          <td class="text-xs-center">{{ item.description }}</td>
          <td class="justify-center layout px-0">
            <edit-warehouse :id="item.id" />
            <delete-warehouse :id="item.id" />
          </td>
        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Nebyl nalezen žádný výsledek pro výraz "{{ search }}".
      </v-alert>
    </v-data-table>
  </div>
</template>

<script>
import { NewButton, EditButton, DeleteButton } from "../module/warehouse";
export default {
  components: {
    "new-warehouse": NewButton,
    "edit-warehouse": EditButton,
    "delete-warehouse": DeleteButton
  },
  data: () => ({
    search: "",
    headers: [
      { text: "Číslo skladu", value: "degree", align: "center" },
      { text: "Název", value: "firstName", align: "center" },
      { text: "Odpovědný zaměstnanec", value: "lastName", align: "center" },
      { text: "Poznámka", value: "description", align: "center" },
      { text: "Akce", value: "action", align: "center" }
    ]
  }),
  computed: {
    warehouses() {
      return this.$store.state.warehouse.warehouses;
    }
  },
  created() {
    this.$store.dispatch("loadAllWarehouses");
  },
  watch: {},
  methods: {
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