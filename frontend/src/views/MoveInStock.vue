<template>
  <v-stepper v-model="page">
    <v-stepper-header>
      <v-stepper-step :complete="page > 1" editable step="1" @click="page = 1">Výběr nástrojů</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="page > 2" step="2" :editable="page > 2" @click="page = 2">Jednotlivé položky</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Konečná kontrola</v-stepper-step>
    </v-stepper-header>
    <v-layout display-2 align-center justify-center mt-3>{{title}}</v-layout>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-flex offset-xs4 xs4>
          <SelectMoveType />
        </v-flex>
        <ToolsTable :headers="headers" v-on:selectedItems="selectedTools">
          <template slot="filters" slot-scope="slotProps">
            <Filters v-bind="slotProps" />
          </template>
        </ToolsTable>
        <div v-bind:style="style.pageButtons">
          <v-btn color="primary" @click="nextPage">Další krok</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="2">
        <ItemsList1 v-if="moveType == 0" :tools="selected" />
        <ItemsList2 v-else-if="moveType == 1" :tools="selected" />
        <ItemsList v-else :tools="selected" />
        <div v-bind:style="style.pageButtons">
          <v-btn flat @click="previousPage">Zpět</v-btn>
          <v-btn color="primary" @click="nextPage">Další</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="3">
        <ItemsListPreview />
        <div v-bind:style="style.pageButtons">
          <v-btn flat @click="previousPage">Zpět</v-btn>
          <v-btn color="primary" @click="create">Uložit</v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { filter } from "ramda";
import SelectMoveType from "../module/stock/SelectMoveType";
import ToolsTable from "../module/tool/ToolsTable";
import ItemsList from "../module/tool/ToolItemsListForMove";
import ItemsList1 from "../module/tool/ToolItemsListForMove.1";
import ItemsList2 from "../module/tool/ToolItemsListForMove.2";
import ItemsListPreview from "../module/tool/ToolItemsListForMovePreview";
import Filters from "../module/tool/FiltersForToolsTable";
import { createMove } from "../module/stock";
export default {
  components: {
    SelectMoveType: SelectMoveType,
    ToolsTable: ToolsTable,
    ItemsList: ItemsList,
    ItemsList1: ItemsList1,
    ItemsList2: ItemsList2,
    ItemsListPreview: ItemsListPreview,
    Filters: Filters
  },
  name: "MoveInStock",
  data: () => ({
    page: 0,
    headers: [],
    headersSelect: ["supplier", "name", "count"],
    style: {
      pageButtons: {
        float: "right",
        marginTop: "8px"
      }
    },
    selected: []
  }),
  created() {
    this.headersConfig();
  },
  computed: {
    moveType() {
      return this.$store.state.stock.moveItems.type;
    },
    title() {
      return this.$store.state.stock.moveItems.exporter
        ? "Výdejka"
        : "Přijemka";
    }
  },
  methods: {
    nextPage() {
      this.page++;
    },
    previousPage() {
      this.page--;
    },
    selectedTools(items) {
      this.selected = items;
    },
    headersConfig() {
      this.headers = filter(x => {
        return this.headersSelect.indexOf(x.value) !== -1;
      }, this.$store.state.tool.columns);
    },
    create() {
      if (confirm(`Opravdu zpracovat tuto výdejku?`)) {
        createMove(this.$store);
        this.$router.push("fe/tools");
      }
    }
  }
};
</script>
