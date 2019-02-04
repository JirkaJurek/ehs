<template>
  <v-dialog :value="true" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Zápis provedené revize</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-date-picker v-model="editedItem.date"></v-date-picker>
              <v-text-field v-model="editedItem.date" label="Datum"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-select return-object :items="revisionTypes" v-model="editedItem.revisionType" :item-text="revisionTypeName" label="Typy revize" persistent-hint></v-select>
              <v-textarea v-model="editedItem.description" label="Popisek"></v-textarea>
              <v-text-field v-model="editedItem.who" label="Kdo"></v-text-field>
              <upload-file v-on:update="updateImages" :selectedFiles="transformFiles(editedItem.files)" ref="uploadFile"></upload-file>
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
import { map, prop } from "ramda";
export default {
  props: ["defaultItem", "id", "selectedIds"],
  name: "DialogRevision",
  data: () => ({
    editedItem: {}
  }),
  computed: {
    formTitle() {
      return this.id > 0 ? "Editace typů revize" : "Nový typ revize";
    },
    revisionTypes() {
      return this.$store.state.tool.revisionType;
    }
  },
  created() {
    this.editedItem = this.defaultItem;
  },
  methods: {
    revisionTypeName({ name, description }) {
      return `${name} (${description})`;
    },
    transformFiles(files) {
      if (!files) {
        return [];
      }
      return map(prop("id"), this.toJson(files));
    },
    updateImages(data) {
      this.editedItem.files = data;
    },
    close() {
      this.$store.commit("setComponent", null);
    },
    async save() {
      if (this.id) {
        await this.axios.post(`/tools/revisions/${this.id}`, this.editedItem);
      } else {
        await this.axios.post("/tools/revisions", {
          items: this.selectedIds,
          revision: this.editedItem
        });
      }
      this.$store.dispatch("loadAllTool");
      this.close();
    }
  }
};
</script>
