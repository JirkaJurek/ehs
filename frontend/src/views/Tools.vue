<template>
  <div>
    <v-layout display-4 align-center justify-center>Plán údržby 2018</v-layout>
    <v-toolbar flat color="white">
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-flex xs12 sm6>
        <v-select :items="employees" v-model="filter.employee" :menu-props="{ maxHeight: '400' }" label="Select" multiple hint="Pick your favorite states" persistent-hint></v-select>
      </v-flex>
      <v-flex xs12 sm6>
        <v-select :items="categories" v-model="filter.categories" :menu-props="{ maxHeight: '400' }" label="Select" multiple hint="Pick your favorite states" persistent-hint></v-select>
      </v-flex>
      <v-flex xs12 sm6>
        <v-select :items="headersFieldForSelect" v-model="headersSelect" :menu-props="{ maxHeight: '400' }" label="Viditelná pole" multiple hint="Viditelná pole" persistent-hint>
          <template slot="selection" slot-scope="{ item, index }">
            <span v-if="index === 0">{{ item.text }}</span>
            <span v-if="index === 1" class="grey--text caption">(a dalších)</span>
          </template>
        </v-select>
      </v-flex>
      <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový nástroj</v-btn>
      <v-btn :disabled="bulk" @click.native="showDialogNewRevisions(0)" color="primary" class="mb-2">Nová revize</v-btn>
      <v-btn :disabled="bulk" @click.native="deleteItem()" color="primary" class="mb-2">Smazat</v-btn>
    </v-toolbar>
    <v-data-table :custom-sort="customSort" hide-actions :headers="headers" :items="tools" :search="search" class="elevation-1" v-model="selected" item-key="id" select-all>
      <template slot="items" slot-scope="props">
        <tr v-bind:class="{ 'red lighten-4' : props.item.nextRevision < 6 }">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <td v-bind:class="textFontSizeClass" v-if="viewSupplier">{{ props.item.supplier }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewCategories">
            <v-chip v-for="(category, key) in toJson(props.item.categories).slice(0,3)" v-bind:key=key>
              {{ category.text }}
            </v-chip>
          </td>
          <td v-bind:class="textFontSizeClass" v-if="viewName">{{ props.item.name }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewRevisionCard">{{ props.item.revisionCard }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewStartWork">{{ props.item.startWork }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewSeriesNumber">{{ props.item.seriesNumber }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewInternal">{{ props.item.internal }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewExternal">{{ props.item.external }}</td>

          <!--
          <td v-bind:class="textFontSizeClass" v-if="viewExternalMaintence">
              {{ props.item.externalMaintenance.text || props.item.externalMaintenance }}
          </td>
            -->
          <td v-bind:class="textFontSizeClass" v-if="viewNextRevision">{{ props.item.nextRevision }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewComment">{{ props.item.comment }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewEmployee">{{ props.item.employee ? toJson(props.item.employee).text : '' }}</td>
          <td v-bind:class="textFontSizeClass" v-if="viewRevision" @click="showDialogAllRevisions(props.item.id)">
            <!-- nevím jaký bude mít vliv na výkon toJson -->
            <v-chip>{{ oneRevision(toJson(props.item.revisions)) }}</v-chip>
            <span v-if="toJson(props.item.revisions).length > 1" class="grey--text caption">(+{{ toJson(props.item.revisions).length - 1 }} dalších)</span>
          </td>
          <td v-bind:class="textFontSizeClass" v-if="viewStock">{{ props.item.inStock ? 'ano' : 'ne' }}</td>
          <td v-bind:class="textFontSizeClass" class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item.id)">
              edit
            </v-icon>
            <v-icon small class="mr-2" @click="editItem(props.item.id, true)">
              filter_none
            </v-icon>
            <v-icon small @click="deleteItem(props.item.id)">
              delete
            </v-icon>
          </td>
        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    <dialog-tool v-if="dialogNewItem" ref=dialogNewItem></dialog-tool>
    <revision-tool ref=revisionTool />
  </div>
</template>

<style scoped>
.test-size-1 {
  font-size: 13px;
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
  defaultTo
} from "ramda";
import moment from "moment";
export default {
  data: () => ({
    totalItems: 0,
    dialogNewItem: false,
    textFontSizeClass: "test-size-1",
    search: "",
    filter: {
      employee: [],
      categories: []
    },
    employees: [],
    categories: [],
    selected: [],
    headers: [],
    headersSelect: [
      "supplier",
      "categories",
      "name",
      "revisionCard",
      "startWork",
      "seriesNumber",
      "internal",
      "external",
      "externalMaintence",
      "nextRevision",
      "comment",
      "employeeId",
      "revisions",
      "inStock",
      "actions"
    ],
    //tools: [],
    editedIndex: -1,
    newRevision: {},
    bulk: true,
    pagination: {}
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
    viewInternal() {
      return this.headersSelect.indexOf("internal") !== -1;
    },
    viewExternal() {
      return this.headersSelect.indexOf("external") !== -1;
    },
    viewExternalMaintence() {
      return this.headersSelect.indexOf("externalMaintence") !== -1;
    },
    viewNextRevision() {
      return this.headersSelect.indexOf("nextRevision") !== -1;
    },
    viewComment() {
      return this.headersSelect.indexOf("comment") !== -1;
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
    headersFieldForSelect() {
      return this.$store.state.tool.columns;
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
    this.initialize();
    this.changeFontSize();
    this.notifyMe();
    this.categories = this.$store.state.tool.categories;
    this.employees = this.$store.getters.getUsersForSelect;
    this.headersConfig();
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
    }
  }
};
</script>

<!--
Tohle je načítání dat ze serveru, čeká to a řadí podle serveru

<script>
  export default {
    data () {
      return {
        totalDesserts: 0,
        desserts: [],
        loading: true,
        pagination: {},
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ]
      }
    },
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi()
            .then(data => {
              this.desserts = data.items
              this.totalDesserts = data.total
            })
        },
        deep: true
      }
    },
    mounted () {
      this.getDataFromApi()
        .then(data => {
          this.desserts = data.items
          this.totalDesserts = data.total
        })
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination

          let items = this.getDesserts()
          const total = items.length

          if (this.pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }

          setTimeout(() => {
            this.loading = false
            resolve({
              items,
              total
            })
          }, 1000)
        })
      },
      getDesserts () {
        return [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
      }
    }
  }
</script>
-->