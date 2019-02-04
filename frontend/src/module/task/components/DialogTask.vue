<template>
  <v-dialog :value="true" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form">
            <v-layout wrap>
              <v-flex xs12 sm6 md3>
                <employee-select :rules="inputRequired" v-on:change="(value) => {editedItem.resolver = value}" :value="editedItem.resolverId" :multiple="false" label="Řešitel" />
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-select :rules="inputRequired" v-model="editedItem.type" :items="types" label="Oblast úkolu" />
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-menu v-model="presumedEnd" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                  <v-text-field :rules="inputRequired" slot="activator" v-model="editedItem.presumedEnd" label="Předpokládaný termín vyřešení" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker locale="cz" :first-day-of-week="1" v-model="editedItem.presumedEnd" @input="startWork = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-textarea :rules="inputRequired" v-model="editedItem.name" label="Název úkolu" />
              </v-flex>
            </v-layout>
          </v-form>
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
import EmployeeSelect from "../../tool/EmployeeSelect";

export default {
  components: {
    "employee-select": EmployeeSelect
  },
  props: ["defaultItem", "id"],
  data: () => ({
    inputRequired: [v => !!v || "Povinné pole"],
    editedItem: {},
    types: ["Vedení", "Výroba", "Obchod", "Servis", "Správní"],
    presumedEnd: false
  }),
  computed: {
    formTitle() {
      return this.id ? "Editace úkolu" : "Nový úkolu";
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
      if (this.$refs.form.validate()) {
        let url = "/task";
        if (this.id > 0) {
          url += "/" + this.id;
        }
        this.axios.post(url, this.editedItem).then(() => {
          this.$store.dispatch("loadAllTasks", {reload: true});
        });
        this.close();
      }
    }
  }
};
</script>
