<template>
  <div>
    <v-layout display-2 align-center justify-center>Evidence nemovitosti, strojů, nářadí a nástrojů - plán revizí</v-layout>
    <div xs12 color="white">
      <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový nástroj</v-btn>
      <v-btn :disabled="bulk" @click.native="showDialogNewRevisions(0)" color="primary" class="mb-2">Zápis provedené revize</v-btn>
      <v-btn :disabled="bulk" @click.native="deleteItem()" color="primary" class="mb-2">Smazat</v-btn>
    </div>
    <v-toolbar flat color="white">
      <!--<v-text-field v-model="filter.search" append-icon="search" label="Vyhledávání" single-line hide-details></v-text-field>-->
      <v-flex xs12 sm4>
        <v-text-field v-model="search" append-icon="search" label="Vyhledávání" single-line hide-details></v-text-field>
      </v-flex>
      <v-flex xs12 sm4>
        <v-select :items="employees" v-model="filter.employee" label="Zaměstnanci" multiple item-text="name" item-value="id" persistent-hint></v-select>
      </v-flex>
      <v-flex xs12 sm4>
        <v-select :items="categories" v-model="filter.categories" label="Kategorie" multiple item-text="name" item-value="id" persistent-hint></v-select>
      </v-flex>
      <v-flex xs12 sm1>
        <v-switch label="Smazané" v-model="filter.deletedAt"></v-switch>
      </v-flex>
      <v-flex xs12 sm3>
        <v-select :items="headersFieldForSelect" v-model="headersSelect" :menu-props="{ maxHeight: '400' }" label="Viditelná pole" multiple persistent-hint>
          <template slot="selection" slot-scope="{ item, index }">
            <span v-if="index === 0">{{ item.text }}</span>
            <span v-if="index === 1" class="grey--text caption">(a dalších)</span>
          </template>
        </v-select>
      </v-flex>
    </v-toolbar>
    <v-data-table id="toolTable" :search=search :custom-sort="customSort" :headers="headers" :items="tools" class="elevation-1" v-model="selected" item-key="id" select-all :rows-per-page-items="rowsItem">
      <template slot="items" slot-scope="props">
        <tr>
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <td v-bind:class="textFontSizeClass" v-if="viewSupplier">{{ props.item.supplier }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewCategories">
            <span v-for="(category, key) in toJson(props.item.categories)" v-bind:key=key>
              {{key > 0 ? ", " : ""}}{{ category.name }}
            </span>
          </td>
          <td v-bind:class="textFontSizeClass" v-if="viewName">{{ props.item.name }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewRevisionCard">{{ props.item.revisionCard }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewStartWork">{{ props.item.startWork }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewSeriesNumber">{{ props.item.seriesNumber }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewInventoryNumber">{{ props.item.inventoryNumber }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewMachineNumber">{{ props.item.machineNumber }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewYearOfManufacture">{{ props.item.yearOfManufacture }}</td>
          <!--
          <td v-bind:class="textFontSizeClass" v-if="viewExternalMaintence">
              {{ props.item.externalMaintenance.text || props.item.externalMaintenance }}
          </td>
            -->
          <td v-bind:class="textFontSizeClass" v-if="viewComment">{{ props.item.comment }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewFilter1">{{ props.item.filter1 }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewFilter2">{{ props.item.filter2 }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewFilter3">{{ props.item.filter3 }}</td>
          <!--
          <td v-bind:class="textFontSizeClass" v-if="viewEmployee">{{ props.item.employee ? toJson(props.item.employee).text : '' }}</td>
          -->
          <td v-bind:class="textFontSizeClass" v-if="viewRevision" @click="showDialogAllRevisions(props.item.id)">
            <!-- nevím jaký bude mít vliv na výkon toJson -->
            <v-chip>{{ oneRevision(toJson(props.item.revisions)) }}</v-chip>
            <span v-if="toJson(props.item.revisions).length > 1" class="grey--text caption">(+{{ toJson(props.item.revisions).length - 1 }} dalších)</span>
          </td>
          <!--
          <td v-bind:class="textFontSizeClass" v-if="viewStock">{{ props.item.inStock ? 'ano' : 'ne' }}</td>
          -->
          <td v-bind:class="textFontSizeClass" v-if="viewPrice">{{ props.item.price}}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewCount" @click="showToolItems(props.item)">
            <v-chip>{{ toolItemsCount(props.item.items)}}</v-chip>
          </td>
          <td v-bind:class="textFontSizeClass" v-if="viewFiles">
            <v-btn round color="primary" dark @click="showFiles(props.item.id)">
              {{ hasFiles(props.item.files) }}
              <v-icon>image_search</v-icon>
            </v-btn>
          </td>
          <td v-bind:class="textFontSizeClass" class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item.id)" title="Editace" v-if="!filter.deletedAt">
              edit
            </v-icon>
            <v-icon small class="mr-2" @click="editItem(props.item.id, true)" title="Klonovat" v-if="!filter.deletedAt">
              filter_none
            </v-icon>
            <v-icon small @click="deleteItem(props.item.id)" title="Smazat" v-if="!filter.deletedAt">
              delete
            </v-icon>
            <!--
            <v-icon small @click="showDialogAllServices(props.item)">
              build
            </v-icon>
            -->
            <v-icon small @click="revertItem(props.item.id)" title="Vrátit zpět" v-if="filter.deletedAt">
              cached
            </v-icon>
          </td>
        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ filter.search }}" found no results.
      </v-alert>
    </v-data-table>
    <dialog-tool v-if="dialogNewItem" ref=dialogNewItem></dialog-tool>
    <revision-tool ref=revisionTool />
    <show-files ref=showFiles />
    <dialog-tool-service ref=dialogToolService />
    <tool-items ref="toolItems" />
  </div>
</template>

<!--
<style>
#toolTable table {
  table-layout: fixed
}
#toolTable .v-table__overflow {
  max-height: 100vh;
  overflow: auto;
  width: 90%
}
#toolTable th {
  position: sticky
}
.test-size-1 {
  font-size: 13px;
}
</style>
-->
<style>
#toolTable .whiteSpace {
  white-space: inherit;
}
#toolTable .wider {
  min-width: 300px;
}
#toolTable table td {
  padding: 0 12px;
}
#toolTable tr:nth-child(even) {
    background-color: #fafafa
}
</style>


<script>
import {
  map,
  lensProp,
  set,
  head,
  filter,
  indexOf,
  gte,
  pipe,
  ifElse,
  always,
  length,
  prop,
  identity,
  findIndex,
  propEq,
  find,
  defaultTo,
  reduce,
  add
} from "ramda";
import moment from "moment";
export default {
  data: () => ({
    search: "",
    totalItems: 0,
    dialogNewItem: false,
    textFontSizeClass: "test-size-1",
    filter: {
      employee: [],
      categories: []
    },
    selected: [],
    headers: [],
    headersSelect: ["supplier", "categories", "name", "actions"],
    editedIndex: -1,
    bulk: true,
    pagination: {},
    rowsItem: [25, 50, 100, { text: "vše", value: -1 }]
  }),

  computed: {
    tools() {
      return this.$store.state.tool.tools;
    },
    formTitle() {
      return this.editedIndex === -1 ? "Nový nástroj" : "Editace nástroje";
    },
    viewSupplier() {
      return this.headersSelect.indexOf("supplier") !== -1;
    },
    viewCategories() {
      return this.headersSelect.indexOf("categories") !== -1;
    },
    viewName() {
      return this.headersSelect.indexOf("name") !== -1;
    },
    viewRevisionCard() {
      return this.headersSelect.indexOf("revisionCard") !== -1;
    },
    viewStartWork() {
      return this.headersSelect.indexOf("startWork") !== -1;
    },
    viewSeriesNumber() {
      return this.headersSelect.indexOf("seriesNumber") !== -1;
    },
    viewInventoryNumber() {
      return this.headersSelect.indexOf("inventoryNumber") !== -1;
    },
    viewMachineNumber() {
      return this.headersSelect.indexOf("machineNumber") !== -1;
    },
    viewYearOfManufacture() {
      return this.headersSelect.indexOf("yearOfManufacture") !== -1;
    },
    viewExternalMaintence() {
      return this.headersSelect.indexOf("externalMaintence") !== -1;
    },
    viewComment() {
      return this.headersSelect.indexOf("comment") !== -1;
    },
    viewFilter1() {
      return this.headersSelect.indexOf("filter1") !== -1;
    },
    viewFilter2() {
      return this.headersSelect.indexOf("filter2") !== -1;
    },
    viewFilter3() {
      return this.headersSelect.indexOf("filter3") !== -1;
    },
    viewEmployee() {
      return this.headersSelect.indexOf("employeeId") !== -1;
    },
    viewRevision() {
      return this.headersSelect.indexOf("revisions") !== -1;
    },
    viewStock() {
      return this.headersSelect.indexOf("inStock") !== -1;
    },
    viewPrice() {
      return this.headersSelect.indexOf("price") !== -1;
    },
    viewCount() {
      return this.headersSelect.indexOf("count") !== -1;
    },
    viewFiles() {
      return this.headersSelect.indexOf("files") !== -1;
    },
    headersFieldForSelect() {
      return this.$store.state.tool.columns;
    },
    categories() {
      return this.$store.state.tool.categories;
    },
    employees() {
      return this.$store.state.user.users;
    }
  },

  watch: {
    dialogAllRevisions(val) {
      val || this.closeDialogAllRevisions();
    },
    selected(val) {
      this.bulk = val.length ? false : true;
    },
    filter: {
      handler() {
        this.initialize();
      },
      deep: true
    },
    headersSelect() {
      this.headersConfig();
    }
  },

  created() {
    if (localStorage.headersSelect) {
      this.headersSelect = JSON.parse(localStorage.headersSelect);
    }
    this.initialize();
    this.changeFontSize();
    this.notifyMe();
    this.headersConfig();
    this.$store.dispatch("inicialize");
  },

  methods: {
    customSort(items, sortBy, descending) {
      if (
        this.pagination.sortBy != sortBy ||
        this.pagination.descending != descending
      ) {
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;
        this.initialize();
      }
      return items;
    },
    initialize() {
      this.$store.dispatch("loadAllTool", {
        filter: this.filter,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending
      });
    },
    changeFontSize() {
      this.textFontSizeClass = "test-size-1";
      this.headers = map(
        set(lensProp("class"), this.textFontSizeClass),
        this.headers
      );
    },
    editItem(itemId = -1, duplicate = false) {
      this.dialogNewItem = true;
      itemId = parseInt(itemId);
      if (this.$refs.dialogNewItem) {
        this.$refs.dialogNewItem.open(itemId, duplicate);
      } else {
        const selfRefs = this.$refs;
        setTimeout(function() {
          selfRefs.dialogNewItem.open(itemId, duplicate);
        }, 300);
      }
    },
    async deleteItem(itemId) {
      console.log(this.pagination);
      if (
        confirm(
          `Opravdu chcete smazat ${itemId ? "tuto položku" : "tyto položky"}?`
        )
      ) {
        const items = itemId ? [itemId] : map(prop("id"), this.selected);
        await this.axios.post("/tools/more-tools", {
          items
        });
        this.initialize();
      }
    },
    oneRevision(revisions) {
      const dateFormat = x => moment(prop("date", x)).format("MM, YY");
      return ifElse(prop("date"), dateFormat, always("Žádná revize"))(
        head(revisions)
      );
    },
    showDialogAllRevisions(itemId) {
      this.$refs.revisionTool.showDialogAllRevisions(itemId);
    },
    showDialogNewRevisions(itemId) {
      this.$refs.revisionTool.selected = this.selected;
      this.$refs.revisionTool.showDialogNewRevisions(itemId);
    },
    hasFiles(files) {
      const filesArray = this.toJson(files);
      return filesArray && filesArray.length ? "ano" : "ne";
    },
    showFiles(itemId) {
      this.$refs.showFiles.open(this.$store.getters.getFilesById(itemId));
    },
    toolItemsCount(data) {
      let text = "0 / 0";
      if (data) {
        const items = this.toJson(data);
        const { count, inStock } = reduce(
          (acc, item) => {
            return {
              count: add(acc.count, item.count),
              inStock: add(acc.inStock, item.inStock)
            };
          },
          { count: 0, inStock: 0 },
          items
        );
        text = `${count} / ${inStock}`;
      }

      return text;
    },
    showDialogAllServices(item) {
      this.$refs.dialogToolService.open([], this.toJson(item.items));
    },
    showToolItems(item) {
      this.$refs.toolItems.open(item);
    },
    async revertItem(itemId) {
      if (confirm(`Opravdu chcete smazanou položku vrátit zpět?`)) {
        await this.axios.post(`/tools/revert/${itemId}`);
        this.initialize();
      }
    },
    notifyMe() {
      /*
      setTimeout(() => {
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
          var notification = new Notification(
            "Důležité upozornění v intranetu!"
          );
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission(function(permission) {
            if (permission === "granted") {
              var notification = new Notification(
                "Důležité upozornění v intranetu!"
              );
            }
          });
        }
      }, 2000);
      */
    },
    toJson(data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    },
    headersConfig() {
      this.headers = filter(x => {
        return this.headersSelect.indexOf(x.value) !== -1;
      }, this.$store.state.tool.columns);
      localStorage.headersSelect = JSON.stringify(this.headersSelect);
    }
  }
};
</script>