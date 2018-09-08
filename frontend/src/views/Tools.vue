<template>
  <div>
    <v-layout display-4 align-center justify-center >Plán údržby 2018</v-layout>
    <v-toolbar flat color="white">
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-flex xs12 sm6>
          <v-select
            :items="employees"
            v-model="filter.employee"
            :menu-props="{ maxHeight: '400' }"
            label="Select"
            multiple
            hint="Pick your favorite states"
            persistent-hint
          ></v-select>
        </v-flex>
      <v-flex xs12 sm6>
          <v-select
            :items="categories"
            v-model="filter.categories"
            :menu-props="{ maxHeight: '400' }"
            label="Select"
            multiple
            hint="Pick your favorite states"
            persistent-hint
          ></v-select>
        </v-flex>
      <v-dialog v-model="dialogNewItem">
        <v-btn slot="activator" color="primary" dark class="mb-2">Nový nástroj</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.supplier" label="Dodavatel"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.category" label="Kategorie"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Název stroje"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.revizion" label="Revizní karta el. nářadí"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.startWork" label="Uvedeno do provozu"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.seriesNumber" label="Sériové číslo/rok výroby"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.internal" label="Interní – dle plánu – FB 6_0025"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.external" label="Externí"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.externalMaintenance" label="Časový interval – externí údržba"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.lastMaintenance" label="Poslední údržba – externí"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.comment" label="Poznámka"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.employeeId" label="Zaměstnanec"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.revizions" label="Revizní karta el. nářadí"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDialogNewItem">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogAllRevisions">
        <v-card>
          <v-card-title>
            <span class="headline">Všechny revize</span>
          </v-card-title>
          <v-data-table
                  :items="itemRevisions.revisions"
                  class="elevation-1"
                  hide-actions
                  hide-headers
                >
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
                  <v-text-field v-model="newRevision.date" label="Datum"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="newRevision.description" label="Popisek"></v-text-field>
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
    <v-data-table
      :headers="headers"
      :items="tools"
      :search="search"
      :pagination.sync="pagination"
      class="elevation-1"
      v-model="selected"
      item-key="id"
      select-all
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td v-bind:class="textFontSizeClass">{{ props.item.supplier }}</td>
        <td v-bind:class="textFontSizeClass">{{ props.item.category.name }}</td>
        <td v-bind:class="textFontSizeClass">{{ props.item.name }}</td>
        <td v-bind:class="textFontSizeClass">{{ props.item.revizion }}</td>
        <td v-bind:class="textFontSizeClass">{{ props.item.startWork }}</td>
        <td v-bind:class="textFontSizeClass">{{ props.item.seriesNumber }}</td>
        <td v-bind:class="textFontSizeClass">{{ props.item.internal }}</td>
        <td v-bind:class="textFontSizeClass">{{ props.item.external }}</td>
        <td v-bind:class="textFontSizeClass">{{ props.item.externalMaintenance }}</td>
        <td v-bind:class="textFontSizeClass">{{ props.item.lastMaintenance }}</td>
        <td v-bind:class="textFontSizeClass">{{ props.item.comment }}</td>
        <td v-bind:class="textFontSizeClass">{{ props.item.employee.name }}</td>
        <td v-bind:class="textFontSizeClass" 
          @click="showDialogAllRevisions(props.item)">
          <v-chip>{{ oneRevision(props.item.revisions) }}</v-chip>
          <span
            v-if="props.item.revisions.length > 1"
            class="grey--text caption"
          >(+{{ props.item.revisions.length - 1 }} dalších)</span>

        </td>
        <td v-bind:class="textFontSizeClass" class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
    </v-data-table>
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
} from "ramda";
import moment from "moment";
export default {
  data: () => ({
    textFontSizeClass: "test-size-1",
    search: "",
    filter: {
      employee: [],
      categories: []
    },
    pagination: {
      sortBy: "fat"
    },
    employees: [
      { value: 1, text: "Tester" },
      { value: 2, text: "Uklízečka" },
      { value: 3, text: "Modelář" }
    ],
    categories: [
      { value: 1, text: "CNS" },
      { value: 2, text: "Ruční nářadí" },
      { value: 3, text: "Pily" }
    ],
    selected: [],
    dialogNewItem: false,
    dialogAllRevisions: false,
    dialogAllRevisions: false,
    dialogNewRevision: false,
    headers: [
      { text: "Dodavatel", value: "supplier" },
      { text: "Kategorie", value: "category" },
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
      { text: "Poslední údržba – externí", value: "lastMaintenance" },
      { text: "Poznámka", value: "comment" },
      { text: "Zaměstnanec", value: "employeeId" },
      { text: "Revize", value: "revisions" },
      { text: "Actions", align: "center", value: "actions", sortable: false }
    ],
    tools: [],
    editedIndex: -1,
    itemRevisions: {},
    itemRevisionsId: 0,
    newRevision: {},
    editedItem: {
      supplier: "",
      category: {},
      name: "",
      revizion: "",
      startWork: "",
      seriesNumber: "",
      internal: "",
      external: "",
      externalMaintenance: "",
      lastMaintenance: "",
      comment: "",
      employee: {},
      revisions: []
    },
    defaultItem: {
      supplier: "",
      category: {},
      name: "",
      revizion: "",
      startWork: "",
      seriesNumber: "",
      internal: "",
      external: "",
      externalMaintenance: "",
      lastMaintenance: "",
      comment: "",
      employee: {},
      revisions: []
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nový nástroj" : "Editace nástroje";
    }
  },

  watch: {
    dialogNewItem(val) {
      val || this.closeDialogNewItem();
    },
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
              indexOf(x.category.id),
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
  },

  methods: {
    initialize() {
      this.tools = [
        {
          id: 1,
          supplier: "HOUFEK",
          category: {
            id: 1,
            name: "CNC"
          },
          name: "CNC frézka TITAN 623215-G5 HOUFEK",
          revizion: "",
          startWork: "2009",
          seriesNumber: "001/2009",
          internal: true,
          external: true,
          externalMaintenance: "Ročně",
          lastMaintenance: "2. 7. 2013 0:00:00",
          comment: "Frozen Yogurt",
          employee: { id: 1, name: "Tester" },
          revisions: [
            { date: "2018-01-01", description: 'popisek' }, 
            { date: "2017-01-01", description: 'popisek' }
          ]
        },
        {
          id: 2,
          supplier: "",
          category: {
            id: 2,
            name: "Ruční nářadí"
          },
          name: "Vývěva VTLF 2.250/0-79  BECKER",
          revizion: "",
          startWork: "2015",
          seriesNumber: "2701913/2013",
          internal: true,
          external: true,
          externalMaintenance: "1x za 2 roky",
          lastMaintenance: "2. 7. 2013 0:00:00",
          comment: "Frozen Yogurt",
          employee: { id: 2, name: "Uklízečka" },
          revisions: []
        },
        {
          id: 3,
          supplier: "",
          category: {
            id: 3,
            name: "Pily"
          },
          name: "Pila pásová UH 800 HEMA",
          revizion: "",
          startWork: "2008",
          seriesNumber: "83306/1979",
          internal: true,
          external: true,
          externalMaintenance: "1x za 2 roky",
          lastMaintenance: "28.-29.3.2013",
          comment: "Frozen Yogurt",
          employee: { id: 3, name: "Modelář" },
          revisions: []
        }
      ];
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

    editItem(item) {
      this.editedIndex = this.tools.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogNewItem = true;
    },

    deleteItem(item) {
      const index = this.tools.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tools.splice(index, 1);
    },

    closeDialogNewItem() {
      this.dialogNewItem = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tools[this.editedIndex], this.editedItem);
      } else {
        this.tools.push(this.editedItem);
      }
      this.closeDialogNewItem();
    },
    oneRevision(revisions) {
      const dateFormat = x => moment(prop('date', x)).format("MM, YY");
      return ifElse(
        prop("date"),
        dateFormat,
        always("Žádná revize")
      )(head(revisions));
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
      this.tools[findIndex(propEq('id', this.itemRevisionsId), this.tools)].revisions.push(
        Object.assign({}, this.newRevision)
      )
      this.dialogNewRevision = false;
    },
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