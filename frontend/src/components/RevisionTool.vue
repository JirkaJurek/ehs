<template>
  <div>
    <v-dialog v-model="dialogAllRevisions">
      <v-card>
        <v-card-title>
          <span class="headline">Všechny revize</span>
        </v-card-title>
        <v-data-table :items="revisions" class="elevation-1" hide-actions :headers="headers">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.date | dateFormat }}</td>
            <td>{{ props.item.nextRevision | dateFormat }}</td>
            <td>{{ getRevisionTypeName(props.item.revisionType) }}</td>
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.who }}</td>
            <td>
              <v-btn round color="primary" dark @click="showFiles(props.item.files)">
                {{ hasFiles(props.item.files) }}
                <v-icon>image_search</v-icon>
              </v-btn>
            </td>
            <td>
              <v-icon small class="mr-2" @click="editRevision(props.item)" title="Editace">
                edit
              </v-icon>
            </td>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <new-revision-button :selectedIds="[itemRevisionsId]" />
          <v-btn color="blue darken-1" flat @click.native="closeDialogAllRevisions">Zrušit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <show-files ref=showFiles />
  </div>
</template>

<script>
import { map, prop } from "ramda";
import RevisionMixin from "../module/revision/mixins/RevisionMixin";
import { NewRevisionButton } from "../module/revision/components";
export default {
  components: {
    'new-revision-button': NewRevisionButton
  },
  name: "RevisionTool",
  mixins: [RevisionMixin],
  data: () => ({
    dialogAllRevisions: false,
    dialogNewRevision: false,
    newRevision: {},
    itemRevisionsId: 0,
    selected: [],
    editRevisonId: 0,
    headers: [
      {
        text: "Poslední revize",
        value: "date"
      },
      { text: "Příští revize", value: "date2" },
      { text: "Typ revize", value: "revisionType" },
      { text: "Poznámka", value: "description" },
      { text: "Kdo", value: "who" },
      { text: "Dokumenty", value: "files" },
      { text: "Akce", value: "action" }
    ]
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
    getRevisionTypeName(data) {
      const revisionType = this.toJson(data);
      return revisionType ? revisionType.name : "";
    },
    editRevision(item) {
      this.editItem(item.id, item);
    },
    updateImages(data) {
      this.newRevision.files = data;
    },
    transformFiles(files) {
      if (!files) {
        return [];
      }
      return map(prop("id"), this.toJson(files));
    },
    hasFiles(files) {
      const filesArray = this.toJson(files);
      return filesArray && filesArray.length ? "ano" : "ne";
    },
    showFiles(files) {
      files = files ? this.toJson(files) : [];
      this.$refs.showFiles.open(files);
    }
  }
};
</script>
