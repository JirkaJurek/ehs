<template>
  <v-dialog v-model="isOpen" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{title}}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-select return-object :rules="employeeRules" :items="employees" v-model="employee" item-text="name" label="Zaměstnanec" persistent-hint required></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="number" :rules="numberRules" label="Počet kusu" required type="number"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Zrušit</v-btn>
        <v-btn color="blue darken-1" flat @click.native="add">Přidat</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { is, nth } from "ramda";
import { addItem } from "./index";
export default {
  props: ["myData"],
  data: () => ({
    isOpen: true,
    valid: false,
    employee: null,
    number: "",
    maxNumber: null,
    numberRules: [
      v => !!v || "Počet kusu je povinný"
      // v => is('number', this.maxNumber) || this.maxNumber < v || `Maximální počet položek je ${this.maxNumber}`
    ],
    employeeRules: [v => !!v || "Počet kusu je povinný"]
  }),
  created() {
    try {
      this.employee = this.$store.getters.getUserById(
        nth(0, this.$store.state.tool.filter.filter.employee)
      );
    } catch (e) {
      this.employee = null;
    }
  },
  computed: {
    title() {
      return this.$store.state.stock.moveItems.exporter
        ? "Výdejka"
        : "Přijímka";
    },
    employees() {
      return this.$store.state.user.users;
    }
  },
  methods: {
    close() {
      this.$store.commit("setMainModal", null);
    },
    add() {
      if (this.$refs.form.validate()) {
        addItem(this.$store, {
          toolId: this.myData.toolId,
          employee: this.employee,
          count: this.number
        });
        this.close();
      }
    }
  }
};
</script>
