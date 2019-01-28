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
              <v-date-picker v-model="newRevision.date"></v-date-picker>
              <v-text-field v-model="newRevision.date" label="Datum"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-select return-object :items="revisionTypes" v-model="newRevision.revisionType" item-text="name" label="Typy revize" persistent-hint></v-select>
              <v-textarea v-model="newRevision.description" label="Popisek"></v-textarea>
              <v-text-field v-model="newRevision.who" label="Kdo"></v-text-field>
              <upload-file v-on:update="updateImages" :selectedFiles="transformFiles(newRevision.files)" ref="uploadFile"></upload-file>
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
  props: ["defaultItem", "id"],
  name: "DialogToolRevisionType",
  data: () => ({
    editedItem: {}
  }),
  computed: {
    formTitle() {
      return this.id > 0 ? "Editace typů revize" : "Nový typ revize";
    },
    revisionInterval() {
      return this.$store.state.tool.revisionInterval;
    }
  },
  created() {
    this.editedItem = this.defaultItem;
  },
  methods: {
    transformFiles(files) {
      if (!files) {
        return [];
      }
      return map(prop("id"), this.toJson(files));
    },
    close() {
      this.$store.commit("setComponent", null);
    },
    save() {
      if (this.editRevisonId) {
        this.axios
          .post(`/tools/revisions/${this.editRevisonId}`, this.newRevision)
          .then(() => {
            this.$store.dispatch("loadAllTool");
          });
      } else {
        const items =
          this.itemRevisionsId > 0
            ? [this.itemRevisionsId]
            : map(prop("id"), this.selected);
        this.axios
          .post("/tools/revisions", {
            items,
            revision: this.newRevision
          })
          .then(() => {
            this.$store.dispatch("loadAllTool");
          });
      }
      this.close();
    }
  }
};
</script>
