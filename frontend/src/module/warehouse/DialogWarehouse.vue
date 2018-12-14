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
              <v-text-field v-model="editedItem.number" :min="0" :max="100" type="number" label="Číslo skladu" />
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.name" label="Název skladu"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <employee-select v-on:change="(value) => {editedItem.accountableEmployee = value}" :value="editedItem.accountableEmployeeId" :multiple="false" />
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-textarea v-model="editedItem.description" label="Poznámka" />
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
import EmployeeSelect from "../tool/EmployeeSelect";
export default {
  components: {
    "employee-select": EmployeeSelect
  },
  props: ["defaultItem", "id"],
  data: () => ({
    editedItem: {}
  }),
  computed: {
    formTitle() {
      return this.editedItem.name ? "Editace skladu" : "Nový sklad";
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
      let url = "/warehouse";
      if (this.id > 0) {
        url += "/" + this.id;
      }
      this.axios.post(url, this.editedItem).then(response => {
        this.$store.dispatch("loadAllWarehouses", true);
      });
      this.close();
    }
  }
};
</script>