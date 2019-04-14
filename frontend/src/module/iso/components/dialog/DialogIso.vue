<template>
  <v-dialog
    :value="true"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex
              xs12
              sm6
              md4
            >
              <v-text-field
                v-model="editedItem.number"
                label="Číslo dokumentu"
              ></v-text-field>
            </v-flex>
            <v-flex
              xs12
              sm6
              md4
              v-if="type === 'directiveOs'"
            >
              <v-text-field
                v-model="editedItem.version"
                label="Vydání"
              ></v-text-field>
            </v-flex>
            <v-flex
              xs12
              sm6
              md4
            >
              <v-text-field
                v-model="editedItem.fileName"
                label="Název dokumentu"
              ></v-text-field>
            </v-flex>
            <v-flex
              xs12
              sm6
              md4
            >
              <v-menu
                :close-on-content-click="false"
                v-model="validFrom"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="editedItem.validFrom"
                  label="Platný od"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  locale="cz"
                  :first-day-of-week="1"
                  v-model="editedItem.validFrom"
                  @input="validFrom = false"
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
              <v-menu
                :close-on-content-click="false"
                v-model="processedDate"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="editedItem.processedDate"
                  label="Zpracoval dne"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  locale="cz"
                  :first-day-of-week="1"
                  v-model="editedItem.processedDate"
                  @input="processedDate = false"
                ></v-date-picker>
              </v-menu>
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
            <v-flex
              xs12
              sm6
              md4
            >
              <v-menu
                :close-on-content-click="false"
                v-model="approvedDate"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="editedItem.approvedDate"
                  label="Schválil dne"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  locale="cz"
                  :first-day-of-week="1"
                  v-model="editedItem.approvedDate"
                  @input="approvedDate = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex
              xs12
              sm6
              md4
            >
              <input
                type="file"
                @change="onFileChange"
                id="inputFile"
              >
              <label
                for="inputFile"
                class="v-btn theme--dark blue-grey"
              >
                Nahrát nové soubory
                <v-icon
                  right
                  dark
                >cloud_upload</v-icon>
              </label>
              <span v-if="fileIsUploaded">soubor je nahrán</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click.native="close"
        >Zrušit</v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click.native="save"
        >Uložit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EmployeeSelect from "../../../tool/EmployeeSelect";

export default {
  components: {
    "employee-select": EmployeeSelect
  },
  props: ["defaultItem", "id", "type"],
  data: () => ({
    dateOfOnset: false,
    preventiveInspection: false,
    validFrom: false,
    processedDate: false,
    approvedDate: false,
    editedItem: {}
  }),
  computed: {
    formTitle() {
      return this.editedItem.name ? "Editace" : "Nový ISO soubor";
    },
    fileIsUploaded() {
      return this.editedItem.fileId;
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
      let url = `/iso`;
      if (this.id > 0) {
        url += "/" + this.id;
      }
      this.axios.post(url, this.editedItem).then(response => {
        this.$store.dispatch("loadAllIso", {
          reload: true,
          types: [this.type]
        });
      });
      this.close();
    },
    async onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      var formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        formData.append("files[]", files.item(i));
      }
      const result = await this.axios.post("/files", formData);
      this.$set(this.editedItem, 'fileId', Number(result.data.info.insertId))
    }
  }
};
</script>