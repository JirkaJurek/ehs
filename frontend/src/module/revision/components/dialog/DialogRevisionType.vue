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
    close() {
      this.$store.commit("setComponent", null);
    },
    save() {
      let url = "/tools/revision-type";
      if (this.id > 0) {
        url += "/" + this.id;
      }
      this.axios.post(url, this.editedItem).then(response => {
        this.$store.dispatch("inicialize", ["loadAllRevisionType"]);
      });
      this.close();
    }
  }
};
</script>
