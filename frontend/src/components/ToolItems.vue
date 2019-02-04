<template>
  <v-dialog v-model="dialogAllToolItems">
    <v-card>
      <v-card-title>
        <span class="headline">Přehled položek</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-data-table :items="editedItem.items" hide-actions>
                <template slot="headers" slot-scope="props">
                  <tr>
                    <th>Sklad</th>
                    <th>Zaměstnanec</th>
                    <th>Počet kusu</th>
                    <th>Je skladem</th>
                    <th>V servisu</th>
                    <!--
                    <th>Umístění</th>
                    -->
                  </tr>
                </template>
                <template slot="items" item-key="warehouseId" slot-scope="{item}">
                  <tr>
                    <td class="text-xs-center">{{ item.warehouse ? toJson(item.warehouse).name : '' }}</td>
                    <td class="text-xs-center">{{ item.warehouse ? (toJson(toJson(item.warehouse).accountableEmployee)) : '' | employeeName }}</td>
                    <td class="text-xs-center">{{ item.count }}</td>
                    <td class="text-xs-center">{{ item.inStock }}</td>
                    <td class="text-xs-center">{{ item.count - item.inStock }}</td>
                    <!--
                    <td class="text-xs-center">{{ props.item.inService }}</td>
                    <td class="text-xs-center">{{ props.item.place }}</td>
                    -->
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
            <!--
            <v-flex xs12>
              <h3>Historie</h3>
              <v-data-table :items="editedItem.itemsHistory" hide-actions>
                <template slot="headers" slot-scope="props">
                  <tr>
                    <th>Zaměstnanec</th>
                    <th>Počet kusu</th>
                    <th>Typ</th>
                    <th>Popis</th>
                  </tr>
                </template>
                <template slot="items" item-key="warehouseId" slot-scope="props">
                  <tr>
                    <td class="text-xs-center">{{ props.item.warehouse ? props.item.warehouse.name : '' }}</td>
                    <td class="text-xs-center">{{ props.item.countItem }}</td>
                    <td class="text-xs-center">{{ props.item.type == 'receipt' ? 'Výdej' : 'Příjem' }}</td>
                    <td class="text-xs-center">{{ props.item.descritpion }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
            -->
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Zavřít</v-btn>
        <!--
        <v-btn color="blue darken-1" flat @click.native="save">Uložit</v-btn>
        -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  map,
  prop,
  propOr,
  isNil,
  findIndex,
  propEq,
  prepend,
  groupBy,
  pipe,
  mergeWithKey,
  add,
  subtract,
  nth
} from "ramda";
export default {
  name: "DialogTool",
  data: () => ({
    itemId: -1,
    startWork: false,
    guaranteeInto: false,
    editedItem: {},
    dialogAllToolItems: false,
    dialogTollItem: false,
    dialogTollItemExport: false,
    tollItem: {}
  }),
  computed: {
    suppliers() {
      return this.$store.state.tool.suppliers;
    },
    warehouse() {
      return this.$store.state.warehouse.warehouses;
    },
    categories() {
      return this.$store.state.tool.categories;
    },
    revisionTypes() {
      return this.$store.state.tool.revisionType;
    }
  },
  created() {
    this.$store.dispatch("loadAllUsers");
  },
  methods: {
    setItem(data) {
      data.items = data.items ? this.toJson(data.items) : [];
      data.categories = this.toJson(data.categories);
      data.revisionInterval = this.toJson(data.revisionInterval);
      data.warehouse = this.toJson(data.warehouse);
      data.revisionTypes = this.toJson(data.revisionTypes);
      data.itemsHistory = data.itemsHistory
        ? this.toJson(data.itemsHistory)
        : [];
      this.editedItem = data;
    },
    async open(item) {
      this.setItem(item);
      this.dialogAllToolItems = true;
    },
    close() {
      this.dialogAllToolItems = false;
    },
    save() {
      this.axios
        .post(`/tools/${this.editedItem.id}`, this.editedItem)
        .then(response => {
          this.$store.dispatch("loadAllTool");
        });
      this.close();
    },
    exportToolItem(item = { countItem: 1, type: "export" }) {
      this.tollItem = item;
      this.dialogTollItemExport = true;
    },
    editToolItem(item = { countItem: 1, type: "receipt" }) {
      this.tollItem = item;
      this.dialogTollItem = true;
    },
    saveToolItem() {
      const itemIndex = findIndex(
        propEq("warehouse", this.tollItem.warehouse),
        this.editedItem.items
      );
      this.editedItem.itemsHistory.push(this.tollItem);
      if (itemIndex !== -1) {
        this.tollItem.count = this.editedItem.items[itemIndex].count;
        const addition = subtract(
          this.editedItem.items[itemIndex].count,
          this.editedItem.items[itemIndex].inStock
        );
        if (addition >= this.tollItem.countItem) {
          this.tollItem.inStock = add(
            this.tollItem.countItem,
            this.editedItem.items[itemIndex].inStock
          );
        } else {
          this.tollItem.count = add(
            this.tollItem.countItem - addition,
            this.editedItem.items[itemIndex].count
          );
          this.tollItem.inStock = this.tollItem.count;
        }
        this.editedItem.items.splice(itemIndex, 1);
      } else {
        this.tollItem.count = this.tollItem.countItem;
        this.tollItem.inStock = this.tollItem.count;
      }
      this.editedItem.items = prepend(this.tollItem, this.editedItem.items);
      this.dialogTollItem = false;
    },
    saveExportToolItem() {
      const itemIndex = findIndex(
        propEq("warehouse", this.tollItem.warehouse),
        this.editedItem.items
      );
      if (itemIndex !== -1) {
        const item = this.editedItem.items[itemIndex];
        this.editedItem.itemsHistory.push(this.tollItem);
        item.inStock = item.inStock
          ? parseInt(item.inStock)
          : parseInt(item.count);
        this.tollItem.count = this.editedItem.items[itemIndex].count;
        this.tollItem.inStock = subtract(item.inStock, this.tollItem.countItem);
        this.editedItem.items.splice(itemIndex, 1);
        this.editedItem.items = prepend(this.tollItem, this.editedItem.items);
      }
      this.dialogTollItemExport = false;
    },
    deleteToolItem(prop) {
      if (confirm(`Opravdu chcete smazat tuto položku?`)) {
        this.editedItem.items.splice(prop.index, 1);
      }
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
