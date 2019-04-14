<template>
  <div>
    <v-card>
      <v-card-title>
        <v-layout
          my-3
          display-2
          align-center
          justify-center
        >Rozhodnutí jednatele společnosti (RJS)</v-layout>
      </v-card-title>
      <v-card-text>
        <div
          style="margin-bottom: 16px;"
          xs12
          color="white"
        >
          <div style="float: left;">
            <new :type="type" />
          </div>
          <v-flex
            xs12
            sm4
          >
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Vyhledávání"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
        </div>
        <v-data-table
          :search=search
          :headers="headers"
          :items="formIf"
          class="elevation-3"
          item-key="id"
          hide-actions
        >
          <template
            slot="items"
            slot-scope="{item}"
          >
            <iso-content
              :item="item"
              :type="type"
            />
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >
            Nebyl nalezen žádný výsledek pro výraz "{{ search }}".
          </v-alert>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import IsoContent from "../components/IsoContent";
import { NewButton } from "../components";
export default {
  components: {
    new: NewButton,
    "iso-content": IsoContent
  },
  data: () => ({
    search: "",
    headers: [
      { text: "Číslo dokumentu", value: "number", align: "center" },
      { text: "Název dokumentu", value: "fileName", align: "center" },
      {
        text: "Platný od",
        value: "validFrom",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Zpracoval",
        value: "processorId",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Zpracoval dne",
        value: "processedDate",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Schválil",
        value: "approverId",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Schválil dne",
        value: "approvedDate",
        align: "center"
      },
      { text: "Dokument", value: "file", align: "center" },
      { text: "Akce", value: "action", align: "center" }
    ]
  }),
  computed: {
    type() {
      return "decisionRjs";
    },
    formIf() {
      return this.$store.state.iso.decisionRjs;
    }
  },
  created() {
    this.$store.dispatch("loadAllIso", {types: [this.type]});
  },
  watch: {},
  methods: {}
};
</script>