<template>
  <v-dialog :value="true" persistent>
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
              <v-select return-object multiple :items="categories" item-text="name" v-model="editedItem.categories" label="Kategorie"></v-select>
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
                  <v-btn flat color="primary" @click="guaranteeInto = false">Zrušit</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu2.save(editedItem.guaranteeInto)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
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
            <v-flex xs12 sm6 md4>
              <v-checkbox label="Zkontrolováno" v-model="editedItem.check"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Zrušit</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Uložit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { map, prop, propOr, isNil } from "ramda";
export default {
  name: "DialogTool",
  props: ["itemId", "defaultItem", "formTitle"],
  data: () => ({
    startWork: false,
    guaranteeInto: false,
    editedItem: {}
  }),
  computed: {
    suppliers() {
      return this.$store.state.tool.suppliers;
    },
    categories() {
      return this.$store.state.tool.categories;
    }
  },
  created() {
    this.$store.dispatch("loadAllUsers");
    this.editedItem = this.defaultItem;
  },
  methods: {
    close() {
      this.$store.commit("setComponent", null);
    },
    save() {
      let url = "/tools";
      if (this.itemId > 0) {
        url += "/" + this.itemId;
      }
      if (
        this.editedItem.supplier &&
        this.suppliers.indexOf(this.editedItem.supplier) === -1
      ) {
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
  }
};
</script>
