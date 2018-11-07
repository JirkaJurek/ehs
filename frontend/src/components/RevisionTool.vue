<template>
  <div>
    <v-dialog v-model="dialogAllRevisions">
      <v-card>
        <v-card-title>
          <span class="headline">Všechny revize</span>
        </v-card-title>
        <v-data-table :items="revisions" class="elevation-1" hide-actions hide-headers>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.date }}</td>
            <td>{{ getRevisionTypeName(props.item.revisionType) }}</td>
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.who }}</td>
            <td>
              <v-icon small class="mr-2" @click="editRevision(props.item)" title="Editace">
                edit
              </v-icon>
            </td>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="showDialogNewRevisions(itemRevisionsId)">Nová revize</v-btn>
          <v-btn color="blue darken-1" flat @click.native="closeDialogAllRevisions">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogNewRevision">
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
  </div>
</template>

<script>
import { map, prop } from "ramda";
export default {
  name: "RevisionTool",
  data: () => ({
    dialogAllRevisions: false,
    dialogNewRevision: false,
    newRevision: {},
    itemRevisionsId: 0,
    selected: [],
    editRevisonId: 0
  }),
  created() {
    this.$store.dispatch("inicialize", ["loadAllRevisionType"]);
  },
  computed: {
    revisions() {
      return this.$store.getters.getAllRevisionById(this.itemRevisionsId);
    },
    revisionTypes() {
      return this.$store.state.tool.revisionType;
    }
  },
  methods: {
    showDialogAllRevisions(toolId) {
      this.itemRevisionsId = toolId;
      this.dialogAllRevisions = true;
    },
    showDialogNewRevisions(toolId) {
      this.editRevisonId = 0;
      this.itemRevisionsId = toolId;
      this.newRevision = {};
      this.dialogNewRevision = true;
    },
    closeDialogAllRevisions() {
      this.dialogAllRevisions = false;
    },
    closeDialogNewRevision() {
      this.dialogNewRevision = false;
    },
    addRevision() {
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
      this.dialogNewRevision = false;
    },
    getRevisionTypeName(data) {
      const revisionType = this.toJson(data);
      return revisionType ? revisionType.name : "";
    },
    editRevision(item) {
      item.revisionType = this.toJson(item.revisionType);
      this.dialogNewRevision = true;
      this.editRevisonId = item.id;
      this.newRevision = item;
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
