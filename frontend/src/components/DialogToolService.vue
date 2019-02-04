<template>
  <div>
    <v-dialog v-model="dialogAllService">
      <v-card>
        <v-card-title>
          <span class="headline">Všechny servisy</span>
        </v-card-title>
        <v-data-table :items="services" class="elevation-1" hide-actions hide-headers>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.warehouse ? props.item.warehouse.name : '' }}</td>
            <td>{{ props.item.count }}</td>
            <td>{{ props.item.inStock }}</td>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="showDialogNewService(itemRevisionsId)">Nový servis</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialogAllService=false">Zrušit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogNewService">
      <v-card>
        <v-card-title>
          <span class="headline">Nový servis</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-date-picker v-model="newService.date"></v-date-picker>
                <v-text-field v-model="newService.date" label="Datum"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select return-object :items="revisionTypes" v-model="newService.revisionType" item-text="name" label="Typy revize" persistent-hint></v-select>
                <v-textarea v-model="newService.description" label="Popisek"></v-textarea>
                <v-text-field v-model="newService.who" label="Kdo"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeDialognewService">Zrušit</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addRevision">Uložit</v-btn>
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
    dialogAllService: false,
    dialogNewService: false,
    newService: {},
    itemRevisionsId: 0,
    selected: [],
    services: [],
    toolItems: [],
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
    open(services, toolItems) {
      this.services = services ? services : [];
      this.toolItems = toolItems ? toolItems : [];
      this.dialogAllService = true;
    },
    showDialogAllRevisions(toolId) {
      this.itemRevisionsId = toolId;
      this.dialogAllRevisions = true;
    },
    showDialogNewRevisions(itemId) {
      this.dialogNewRevision = true;
    },
    closeDialogAllRevisions() {
      this.dialogAllRevisions = false;
    },
    closeDialogNewRevision() {
      this.dialogNewRevision = false;
    },
    addRevision() {
      const items =
        this.itemRevisionsId > 0
          ? [this.itemRevisionsId]
          : map(prop("id"), this.selected);
      this.axios
        .post("/tools/revisions", {
          items,
          revision: this.newService
        })
        .then(() => {
          this.$store.dispatch("loadAllTool");
        });
      this.dialogNewRevision = false;
    },
    getRevisionTypeName(data) {
      const revisionType = this.toJson(data);
      return revisionType ? revisionType.name : "";
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
