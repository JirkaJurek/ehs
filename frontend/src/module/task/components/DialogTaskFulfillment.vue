<template>
  <v-dialog :value="true" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Nový zápis</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form">
            <v-layout wrap>
              <v-flex xs12 sm6 md3>
                <employee-select v-on:change="(value) => {editedItem.user = value}" :value="editedItem.userId" :multiple="false" label="Zapisovatel" :rules="inputRequired" />
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-select v-model="editedItem.done" :items="done" label="Splněno" suffix="%" :rules="inputRequired" />
              </v-flex>
              <v-flex xs12 sm6 md3>
                <employee-select v-on:change="(value) => {editedItem.resolver = value}" :value="editedItem.resolver.id" :multiple="false" label="Řešitel" :rules="inputRequired" />
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-menu v-model="presumedEnd" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                  <v-text-field :rules="inputRequired" slot="activator" v-model="editedItem.presumedEnd" label="Předpokládaný termín vyřešení" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker locale="cz" :first-day-of-week="1" v-model="editedItem.presumedEnd" @input="startWork = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-textarea v-model="editedItem.description" label="Popisek" :rules="inputRequired" />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
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
  props: ["task"],
  data: () => ({
    presumedEnd: false,
    inputRequired: [v => !!v || "Povinné pole"],
    editedItem: {},
    done: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  }),
  computed: {},
  created() {
    this.editedItem.presumedEnd = this.task.presumedEnd;
    this.editedItem.resolver = this.toJson(this.task.resolver);
  },
  methods: {
    close() {
      this.$store.commit("setComponent", null);
    },
    save() {
      if (this.$refs.form.validate()) {
        this.axios
          .post(`/task/${this.task.id}/fulfillment`, this.editedItem)
          .then(() => {
            this.$store.dispatch("loadAllTasks", true);
          });
        this.close();
      }
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
