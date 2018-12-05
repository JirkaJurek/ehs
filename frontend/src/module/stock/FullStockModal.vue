<template>
  <v-layout row justify-center>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="create" :disabled="disableCreate">Uložit</v-btn>
          </v-toolbar-items>
          <v-toolbar-items>
            <v-btn dark flat @click.native="fullDelete" color="red">Smazat celou přijemku</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-flex offset-xs4 xs4>
          <v-select :items="possibleTypes" :value="moveType" @change="setMoveType" label="Typ" />
        </v-flex>
        <v-data-table :items="moveItems.items" hide-actions class="elevation-1">
          <template slot="headers" slot-scope="props">
            <tr>
              <th>Název nástroje</th>
              <th>Zaměstnanec</th>
              <th>Počet kusu</th>
              <th>Akce</th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ getToolName(props.item.toolId) }}</td>
            <td class="text-xs-center">{{ props.item.employee.name }}</td>
            <td class="text-xs-center">{{ props.item.count }}</td>
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
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {
  deleteItemByIndex,
  cleanMove,
  createMove,
  getPossibleTypes,
  setType
} from "./index";
export default {
  data: () => ({
    isOpen: true
  }),
  computed: {
    moveItems() {
      return this.$store.state.stock.moveItems;
    },
    moveType() {
      return this.$store.state.stock.moveItems.type;
    },
    title() {
      return this.$store.state.stock.moveItems.exporter
        ? "Výdejka"
        : "Přijemka";
    },
    possibleTypes() {
      return getPossibleTypes(this.$store);
    },
    disableCreate() {
      return this.$store.getters.getNumberItems() === 0;
    }
  },
  methods: {
    fullDelete() {
      if (confirm(`Opravdu chcete smazat celou přijemku?`)) {
        cleanMove(this.$store);
      }
    },
    close() {
      this.$store.commit("setMainModal", null);
    },
    getToolName(toolId) {
      return this.$store.getters.getToolNameById(toolId);
    },
    create() {
      if (confirm(`Opravdu zpracovat tuto přijemku?`)) {
        createMove(this.$store);
      }
    },
    deleteItem(index) {
      deleteItemByIndex(this.$store, index);
    },
    setMoveType(value) {
      setType(this.$store, value);
    }
  }
};
</script>
