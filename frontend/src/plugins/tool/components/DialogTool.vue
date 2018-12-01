<template>
  <v-dialog v-model="dialogNewItem">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <!-- tohle by chtělo oddělit zvlášť -->
              <v-combobox v-model="editedItem.supplier" :items="suppliers" label="Dodavatel"></v-combobox>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <category-select />
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.name" label="Název stroje"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.shortName" label="Zkrácený název"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.revisionCard" label="Číslo revizní karty"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-menu :close-on-content-click="false" v-model="startWork" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="editedItem.startWork" label="Uvedeno do provozu" prepend-icon="event" readonly></v-text-field>
                <v-date-picker locale="cz" :first-day-of-week="1" v-model="editedItem.startWork" @input="startWork = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.seriesNumber" label="Sériové číslo"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.inventoryNumber" label="Inventární číslo"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.code" label="Kód"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.machineNumber" label="Označení/číslo stroje"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.yearOfManufacture" label="Rok výroby"></v-text-field>
            </v-flex>
            <!--
            <v-flex xs12 sm6 md4>
              <v-combobox v-model="editedItem.revisionInterval" :items="revisionInterval" label="Časový interval – externí údržba"></v-combobox>
            </v-flex>
            -->
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.price" type="number" label="Cena"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.comment" label="Poznámka"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-menu ref="menu2" v-model="guaranteeInto" :close-on-content-click="false" :nudge-right="40" :return-value.sync="editedItem.guaranteeInto" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="editedItem.guaranteeInto" label="Záruka do" prepend-icon="event" readonly></v-text-field>
                <v-date-picker locale="cz" :first-day-of-week="1" v-model="editedItem.guaranteeInto" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="guaranteeInto = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu2.save(editedItem.guaranteeInto)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <!--
            <v-flex xs12 sm6 md4>
              <v-select return-object :items="employees" v-model="editedItem.employee" label="Zaměstnanec" item-text="name"></v-select>
            </v-flex>
            <v-checkbox v-model="editedItem.inStock" label="Skladem" :value="1"></v-checkbox>
            -->
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.filter1" label="Klíčové slovo 1"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.filter2" label="Klíčové slovo 2"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.filter3" label="Klíčové slovo 3"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <upload-file v-on:update="updateImages" :selectedFiles="transformFiles(editedItem.files)" ref="uploadFile"></upload-file>
            </v-flex>
            <!--<v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.revizions" label="Revizní karta el. nářadí"></v-text-field>
            </v-flex>
            -->
            <!--
            <v-flex xs12>
              <v-select return-object :items="revisionTypes" v-model="editedItem.revisionTypes" item-text="name" label="Typy revizí" multiple chips persistent-hint></v-select>
            </v-flex>
            -->
            <!--
            <v-flex xs12>
              <v-data-table :items="editedItem.items" hide-actions>
                <template slot="headers" slot-scope="props">
                  <tr>
                    <th>Zaměstnanec</th>
                    <th>Počet kusu</th>
                    <th>Je skladem</th>
                    <th>Akce
                      <v-btn small color="blue" @click="editToolItem()">
                        <v-icon dark>add</v-icon> nová položka
                      </v-btn>
                    </th>
                  </tr>
                </template>
                <template slot="items" item-key="employeeId" slot-scope="props">
                  <tr>
                    <td class="text-xs-center">{{ props.item.employee ? props.item.employee.name : '' }}</td>
                    <td class="text-xs-center">{{ props.item.count }}</td>
                    <td class="text-xs-center">{{ props.item.inStock }}</td>
                    <td class="text-xs-center">
                      <v-icon small class="mr-2" @click="editToolItem(props.item, true)">
                        edit
                      </v-icon>
                      <v-icon small @click="deleteToolItem(props)">
                        delete
                      </v-icon>
                    </td>
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
        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
    <!--
    <v-dialog v-model="dialogTollItem" max-width="500px">
      <v-card>
        <v-card-title>
          Nová položka
        </v-card-title>
        <v-card-text>
          <v-select return-object v-model="tollItem.employee" :items="employees" label="Zaměstnanec" item-text="name"></v-select>
          <v-text-field v-model="tollItem.count" type="number" label="Počet kusu"></v-text-field>
          <v-text-field v-model="tollItem.inStock" type="number" label="Počet kusu skladem"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click="dialogTollItem=false">Zavřít</v-btn>
          <v-btn color="primary" flat @click="saveToolItem()">Uložit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    -->
  </v-dialog>
</template>

<script>
import { map, prop, propOr, isNil } from "ramda";
import CategorySelect from "./selects/category";
export default {
  components: {
    "category-select": CategorySelect
  },
  name: "DialogTool",
  data: () => ({
    itemId: -1,
    startWork: false,
    guaranteeInto: false,
    editedItem: {},
    revisionInterval: [
      { value: "1 y", text: "Roční" },
      { value: "6 M", text: "Půlroční" },
      { value: "1 m", text: "Měsíční" },
      { value: "7 d", text: "Týdení" },
      {
        value: "",
        text: "Vlastní pište ve tvaru (y,M,d) např. Roční = 1 y, Měsíční = 1 M",
        disabled: true
      }
    ],
    dialogNewItem: true,
    dialogTollItem: false,
    tollItem: {}
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nový nástroj" : "Editace nástroje";
    },
    suppliers() {
      return this.$store.state.tool.suppliers;
    },
    employees() {
      return this.$store.state.user.users;
    },
    categories() {
      return this.$store.state.tool.categories;
    },
    revisionTypes() {
      return this.$store.state.tool.revisionType;
    }
  },
  created() {},
  methods: {
    setItem(data) {
      data.items = data.items ? this.toJson(data.items) : [];
      data.categories = this.toJson(data.categories);
      data.revisionInterval = this.toJson(data.revisionInterval);
      data.employee = this.toJson(data.employee);
      data.revisionTypes = this.toJson(data.revisionTypes);
      this.editedItem = data;
    },
    async open(itemId, duplicate = false) {
      this.itemId = itemId;
      this.editedItem = {
        inStock: 0,
        items: []
      };
      this.dialogNewItem = true;
      if (this.itemId > -1) {
        let { data } = await this.axios.get("/tools/" + this.itemId);
        this.setItem(data);
      }
      if (duplicate) {
        this.itemId = -1;
      }
    },
    close() {
      this.dialogNewItem = false;
    },
    save() {
      let url = "/tools";
      if (this.itemId > -1) {
        url += "/" + this.itemId;
      }
      if (
        this.editedItem.supplier &&
        this.suppliers.indexOf(this.editedItem.supplier) === -1
      ) {
        console.log(this.editedItem.supplier);
        this.$store.commit("newSupplier", this.editedItem.supplier);
      }
      this.axios.post(url, this.editedItem).then(response => {
        this.$store.dispatch("loadAllTool");
      });
      this.close();
    },
    updateImages(data) {
      this.editedItem.files = data;
    },
    transformFiles(files) {
      if (!files) {
        return [];
      }
      return map(prop("id"), this.toJson(files));
    },
    editToolItem(item = { inStock: 0, count: 1 }, edit) {
      this.tollItem = item;
      this.tollItem.edit = edit;
      this.dialogTollItem = true;
    },
    saveToolItem() {
      if (!this.tollItem.edit) {
        this.editedItem.items.splice(0, 0, this.tollItem);
      }
      this.dialogTollItem = false;
      console.log(this.editedItem.items);
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
