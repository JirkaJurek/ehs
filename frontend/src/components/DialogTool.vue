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
              <v-combobox v-model="editedItem.supplier" :items="suppliers" label="Dodavatel"></v-combobox>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-select return-object :items="categories" v-model="editedItem.categories" label="Kategorie" multiple></v-select>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.name" label="Název stroje"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.revisionCard" label="Číslo revizní karty"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-menu ref="menu" v-model="startWork" :close-on-content-click="false" :nudge-right="40" :return-value.sync="editedItem.startWork" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="editedItem.startWork" label="Uvedeno do provozu" prepend-icon="event" readonly></v-text-field>
                <v-date-picker v-model="editedItem.startWork" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="startWork = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(editedItem.startWork)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.seriesNumber" label="Sériové číslo"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.inventoryNumber" label="Inventární číslo"></v-text-field>
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
                <v-date-picker v-model="editedItem.guaranteeInto" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="guaranteeInto = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu2.save(editedItem.guaranteeInto)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-select return-object :items="employees" v-model="editedItem.employee" label="Zaměstnanec"></v-select>
            </v-flex>
            <v-checkbox
              v-model="editedItem.inStock"
              label="Skladem"
              :value="1"
            ></v-checkbox>
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
              <upload-file v-on:update="updateImages" :selectedFiles="editedItem.files" ref="uploadFile"></upload-file>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <!--<v-text-field v-model="editedItem.revizions" label="Revizní karta el. nářadí"></v-text-field>-->
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
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
    dialogNewItem: true
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nový nástroj" : "Editace nástroje";
    },
    suppliers() {
      return this.$store.state.tool.suppliers;
    },
    employees() {
      return this.$store.getters.getUsersForSelect;
    },
    categories() {
      return this.$store.state.tool.categories;
    },
  },
  created() {},
  methods: {
    setItem(data) {
      data.categories = this.toJson(data.categories);
      data.revisionInterval = this.toJson(data.revisionInterval);
      data.employee = this.toJson(data.employee);
      this.editedItem = data;
    },
    async open(itemId, duplicate = false) {
      this.itemId = itemId;
      this.editedItem = {
        inStock: 1
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
      if (this.editedItem.supplier && this.suppliers.indexOf(this.editedItem.supplier) === -1) {
        console.log(this.editedItem.supplier)
        this.$store.commit('newSupplier', this.editedItem.supplier)
      }
      this.axios.post(url, this.editedItem).then(response => {
        this.$store.dispatch("loadAllTool")
      });
      this.close();
    },
    updateImages(data) {
      this.editedItem.files = data;
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
