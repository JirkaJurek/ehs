<template>
  <div>
    <v-card>
      <v-card-title>
        <v-layout
          my-3
          display-2
          align-center
          justify-center
        >Mobily - firemní flotila</v-layout>
      </v-card-title>
      <v-card-text>
        <div
          style="margin-bottom: 16px;"
          xs12
          color="white"
        >
          <div style="float: left;">
            <new-mobile />
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
          :items="mobileTariffs"
          class="elevation-3"
          item-key="id"
          hide-actions
        >
          <template
            slot="items"
            slot-scope="{item}"
          >
            <tr>
              <td class="text-xs-center">{{ item.degree }}</td>
              <td class="text-xs-center">{{ item.firstName }}</td>
              <td class="text-xs-center">{{ item.lastName }}</td>
              <td class="text-xs-center">{{ item.phoneNumber }}</td>
              <td class="text-xs-center">{{ item.phoneTariff }}</td>
              <td class="text-xs-center">{{ item.isCompanyPhone === "1" ? 'ano' : 'ne' }}</td>
              <td class="text-xs-center">{{ item.phoneType }}</td>
              <td class="text-xs-center">{{ item.buyPhone | dateFormat }}</td>
              <td class="text-xs-center">{{ item.description }}</td>
              <td class="justify-center layout px-0">
                <edit-mobile :id="item.id" />
                <delete-mobile :id="item.id" />
              </td>
            </tr>
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
import { DeleteButton, NewButton, EditButton } from "../components";
export default {
  components: {
    "new-mobile": NewButton,
    "edit-mobile": EditButton,
    "delete-mobile": DeleteButton
  },
  data: () => ({
    search: "",
    headers: [
      { text: "Titul", value: "degree", align: "center" },
      { text: "Jméno", value: "firstName", align: "center" },
      { text: "Příjmení", value: "lastName", align: "center" },
      {
        text: "Číslo mobilu",
        value: "phoneNumber",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Mobilní tarif",
        value: "phoneTariff",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Firemní telefon",
        value: "isCompanyPhone",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Typ telefonu",
        value: "phoneType",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Pořízen kdy",
        value: "buyPhone",
        align: "center"
      },
      { text: "Poznámka", value: "description", align: "center" },
      { text: "Akce", value: "action", align: "center" }
    ]
  }),
  computed: {
    mobileTariffs() {
      return this.$store.state.addressBook.mobileTariffs;
    }
  },
  created() {
    this.$store.dispatch("loadAllMobileTariffs");
  },
  watch: {},
  methods: {}
};
</script>