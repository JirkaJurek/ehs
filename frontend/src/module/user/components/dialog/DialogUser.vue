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
              <v-text-field v-model="editedItem.degree" label="Titul"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.firstName" label="Jméno"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.lastName" label="Přijmení"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.personalNumber" label="Osobní číslo"></v-text-field>
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
export default {
  props: ['defaultItem', 'id'],
  data: () => ({
    editedItem: {}
  }),
  computed: {
    formTitle() {
      return this.editedItem.name ? "Editace zaměstnance" : "Nový zaměstnanec";
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
      let url = "/users";
      if (this.id > 0) {
        url += "/" + this.id;
      }
      this.axios.post(url, this.editedItem).then(response => {
        this.$store.dispatch("loadAllUsers", true);
      });
      this.close();
    }
  }
};
</script>