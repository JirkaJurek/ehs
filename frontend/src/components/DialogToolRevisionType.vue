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
              <v-text-field v-model="editedItem.name" label="Název / Typ"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-combobox v-model="editedItem.revisionInterval" :items="revisionInterval" label="Časový interval údržby"></v-combobox>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-textarea v-model="editedItem.description" label="Popisek"></v-textarea>
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
import { map, prop } from "ramda";
export default {
  name: "DialogToolRevisionType",
  data: () => ({
    itemId: -1,
    editedItem: {},
    dialogNewItem: false
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nový typ revize"
        : "Editace typů revize";
    },
    revisionInterval() {
      return this.$store.state.tool.revisionInterval;
    }
  },
  created() {},
  methods: {
    setItem(data) {
      this.itemId = data.id;
      data.revisionInterval = this.toJson(data.revisionInterval);
      this.editedItem = data;
    },
    async open(item) {
      this.editedItem = {};
      this.itemId = -1;
      if (item) {
        this.setItem(item);
      }
      this.dialogNewItem = true;
    },
    close() {
      this.dialogNewItem = false;
    },
    save() {
      let url = "/tools/revision-type";
      if (this.itemId > -1) {
        url += "/" + this.itemId;
      }
      this.axios.post(url, this.editedItem).then(response => {
        this.$store.dispatch("inicialize", ["loadAllRevisionType"]);
      });
      this.close();
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
