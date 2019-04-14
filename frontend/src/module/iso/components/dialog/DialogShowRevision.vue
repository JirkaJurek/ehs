<template>
  <v-dialog
    :value="true"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">Revize</span>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :items="revisions"
          class="elevation-1"
          hide-actions
          :headers="headers"
          disable-initial-sort
        >
          <template
            slot="items"
            slot-scope="{item}"
          >
            <td>{{ item.indexNumber }}</td>
            <td>{{ item.publishedDate | dateFormat }}</td>
            <td>{{ item.result }}</td>
            <td>
              <user-full-name :id="item.processorId" />
            </td>
            <td>
              <user-full-name :id="item.approverId" />
            </td>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <add :idIso="idIso" />
        <v-btn
          color="blue darken-1"
          flat
          @click.native="close"
        >Zrušit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { NewRevisionButton } from "../";
import UserFullName from "../../../user/components/UserFullName";

export default {
  components: {
    add: NewRevisionButton,
    "user-full-name": UserFullName
  },
  props: ["revisions", "idIso"],
  data: () => ({
    editedItem: {},
    headers: [
      {
        text: "Index revize",
        value: "indexNumber"
      },
      { text: "Datum vydání", value: "publishedDate" },
      { text: "Výsledek změny/revize", value: "result" },
      { text: "Zpracoval", value: "processorId" },
      { text: "Schválil", value: "approverId" }
    ]
  }),
  created() {
    this.editedItem = this.defaultItem;
  },
  methods: {
    close() {
      this.$store.commit("setComponent", null);
    }
  }
};
</script>