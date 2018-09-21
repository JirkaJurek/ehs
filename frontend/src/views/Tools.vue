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
      <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový nástroj</v-btn>
      <v-btn @click.native="showDialogNewRevisions(0)" color="primary" dark class="mb-2">Nová revize</v-btn>

      <v-dialog v-model="dialogAllRevisions">
        <v-card>
          <v-card-title>
            <span class="headline">Všechny revize</span>
          </v-card-title>
          <v-data-table :items="toJson(itemRevisions.revisions)" class="elevation-1" hide-actions hide-headers>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.date }}</td>
              <td>{{ props.item.description }}</td>
            </template>
          </v-data-table>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="showDialogNewRevisions(itemRevisions.id)">Nová revize</v-btn>
            <v-btn color="blue darken-1" flat @click.native="closeDialogAllRevisions">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogNewRevision">
        <v-card>
          <v-card-title>
            <span class="headline">Nová revize</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-date-picker v-model="newRevision.date"></v-date-picker>
                  <v-text-field v-model="newRevision.date" label="Datum"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-textarea v-model="newRevision.description" label="Popisek"></v-textarea>
                  <v-text-field v-model="newRevision.who" label="Kdo"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDialogNewRevision">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="addRevision">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table hide-actions :headers="headers" :items="tools" :search="search" class="elevation-1" v-model="selected" item-key="id" select-all>
      <template slot="items" slot-scope="props">
        <tr v-bind:class="{ 'red lighten-4' : props.item.nextRevision < 6 }">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <td v-bind:class="textFontSizeClass">{{ props.item.supplier }}</td>
          <td v-bind:class="textFontSizeClass">
            <v-chip v-for="(category, key) in props.item.categories.slice(0,3)" v-bind:key=key>
              {{ category.name }}
            </v-chip>
          </td>
          <td v-bind:class="textFontSizeClass">{{ props.item.name }}</td>
          <td v-bind:class="textFontSizeClass">{{ props.item.revizion }}</td>
          <td v-bind:class="textFontSizeClass">{{ props.item.startWork }}</td>
          <td v-bind:class="textFontSizeClass">{{ props.item.seriesNumber }}</td>
          <td v-bind:class="textFontSizeClass">{{ props.item.internal }}</td>
          <td v-bind:class="textFontSizeClass">{{ props.item.external }}</td>

          <td v-bind:class="textFontSizeClass">
            <!--
              {{ props.item.externalMaintenance.text || props.item.externalMaintenance }}
            -->
          </td>
          <td v-bind:class="textFontSizeClass">{{ props.item.nextRevision }}</td>
          <td v-bind:class="textFontSizeClass">{{ props.item.comment }}</td>
          <td v-bind:class="textFontSizeClass">{{ props.item.employee ? props.item.employee.name : '' }}</td>
          <td v-bind:class="textFontSizeClass" @click="showDialogAllRevisions(props.item)">
            <v-chip>{{ oneRevision(props.item.revisions) }}</v-chip>
            <span v-if="props.item.revisions.length > 1" class="grey--text caption">(+{{ props.item.revisions.length - 1 }} dalších)</span>
          </td>
          <td v-bind:class="textFontSizeClass" class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item.id)">
              edit
            </v-icon>
            <v-icon small class="mr-2" @click="editItem(props.item.id, true)">
              filter_none
            </v-icon>
            <v-icon small @click="deleteItem(props.item)">
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
    dialogAllRevisions: false,
    dialogNewRevision: false,
    headers: [
      { text: "Dodavatel", value: "supplier" },
      { text: "Kategorie", value: "categories" },
      { text: "Název stroje", value: "name" },
      { text: "Revizní karta el. nářadí", value: "revizion" },
      { text: "Uvedeno do provozu", value: "startWork" },
      { text: "Sériové číslo/rok výroby", value: "seriesNumber" },
      { text: "Interní – dle plánu – FB 6_0025", value: "internal" },
      { text: "Externí", value: "external" },
      {
        text: "Časový interval – externí údržba",
        value: "externalMaintenance"
      },
      { text: "Další údržba", value: "nextRevision" },
      { text: "Poznámka", value: "comment" },
      { text: "Zaměstnanec", value: "employeeId" },
      { text: "Revize", value: "revisions" },
      { text: "Actions", align: "center", value: "actions", sortable: false }
    ],
    tools: [],
    editedIndex: -1,
    itemRevisions: {},
    itemRevisionsId: 0,
    newRevision: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nový nástroj" : "Editace nástroje";
    }
  },

  watch: {
    dialogAllRevisions(val) {
      val || this.closeDialogAllRevisions();
    },
    filter: {
      handler() {
        this.initialize();
        this.tools = pipe(
          filter(x => {
            return this.basicFilter(
              indexOf(x.employee.id),
              this.filter.employee
            );
          }),
          filter(x => {
            return this.basicFilter(
              indexOf(x.categories.id),
              this.filter.categories
            );
          })
        )(this.tools);
      },
      deep: true
    }
  },

  created() {
    this.initialize();
    this.changeFontSize();
    this.notifyMe();
    this.categories = this.$store.state.tool.categories;
    this.employees = this.$store.getters.getUsersForSelect;
  },

  methods: {
    initialize() {
      this.axios.get("/tools").then(response => {
        this.tools = response.data;
      });
    },
    basicFilter(filterMethod, filterData) {
      return gte(ifElse(length, filterMethod, always(1))(filterData), 0);
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

    deleteItem(item) {
      const index = this.tools.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tools.splice(index, 1);
    },
    oneRevision(revisions) {
      const dateFormat = x => moment(prop("date", x)).format("MM, YY");
      return ifElse(prop("date"), dateFormat, always("Žádná revize"))(
        head(revisions)
      );
    },
    showDialogAllRevisions(item) {
      this.itemRevisions = item;
      this.dialogAllRevisions = true;
    },
    closeDialogAllRevisions() {
      this.dialogAllRevisions = false;
    },
    closeDialogNewRevision() {
      this.dialogNewRevision = false;
    },
    showDialogNewRevisions(itemId) {
      this.itemRevisionsId = itemId;
      this.dialogNewRevision = true;
    },
    addRevision() {
      const items = this.itemRevisionsId > 0 ? [this.itemRevisionsId] : map(prop('id'),this.selected);
      this.axios.post("/tools/revisions", {
        items,
        revision: this.newRevision
      });
      this.dialogNewRevision = false;
      this.itemRevisionsId = 0;
    },
    notifyMe() {
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