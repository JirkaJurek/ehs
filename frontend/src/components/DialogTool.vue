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
              <v-combobox v-model="editedItem.externalMaintenance" :items="revisionInterval" label="Časový interval – externí údržba"></v-combobox>
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
        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogTool",
  props: {
    itemId: {
      type: Number,
      default: -1
    },
  },
  data: () => ({
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
    revisionInterval: [
      { value: "1 y", text: "Roční" },
      { value: "6 m", text: "Půlroční" },
      { value: "1 m", text: "Měsíční" },
      { value: "7 d", text: "Týdení" },
      {
        value: "",
        text: "Vlastní pište ve tvaru (y,m,d) např. Roční = 1 y, Měsíční = 1 m",
        disabled: true
      }
    ],
    dialogNewItem: true
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nový nástroj" : "Editace nástroje";
    }
  },
  methods: {
    setItem(data) {
      this.editedItem = data;
    },
    async open() {
      this.dialogNewItem = true;
      let { data } = await this.axios.get("/tools/" + this.itemId);  
      this.setItem(data);
    },
    close() {
      this.dialogNewItem = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    async initialize() {
      if (this.editedIndex > -1) {
        this.editedItem = await this.axios.get("/tools/" + this.editedIndex);
      }
    },
    save() {
      let url = "/tools";
      if (this.editedIndex > -1) {
        url += "/" + this.editedIndex;
      }
      this.axios.post(url, this.editedItem).then(response => {
        console.log(response);
      });
      this.close();
    }
  }
};
</script>
