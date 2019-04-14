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
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex
              xs12
              sm6
              md4
            >
              <v-menu
                :close-on-content-click="false"
                v-model="publishedDate"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="editedItem.publishedDate"
                  label="Datum vydání"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  locale="cz"
                  :first-day-of-week="1"
                  v-model="editedItem.publishedDate"
                  @input="publishedDate = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex
              xs12
              sm6
              md4
            >
              <employee-select
                v-on:change="(value) => {editedItem.processorId = value.id}"
                :value="editedItem.processorId"
                :multiple="false"
                label="Zpracoval"
              />
            </v-flex>
            <v-flex
              xs12
              sm6
              md4
            >
              <employee-select
                v-on:change="(value) => {editedItem.approverId = value.id}"
                :value="editedItem.approverId"
                :multiple="false"
                label="Schválil"
              />
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="editedItem.result"
                label="Výsledek změny/revize"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click.native="showRevision(idIso)"
        >Zrušit</v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click.native="save()"
        >Uložit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EmployeeSelect from "../../../tool/EmployeeSelect";
import BaseMixin from "../../mixins/base";

export default {
  components: {
    "employee-select": EmployeeSelect
  },
  props: ["idIso"],
  mixins: [BaseMixin],
  data: () => ({
    publishedDate: false,
    editedItem: {}
  }),
  methods: {
    save() {
      const url = `/iso/${this.idIso}/revision`;
      this.axios.post(url, this.editedItem).then(response => {
        this.showRevision(this.idIso);
      });
    }
  }
};
</script>