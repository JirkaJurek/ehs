<template>
  <div>
    <v-layout
      my-3
      display-2
      align-center
      justify-center
    >Přehled zaměstnanců</v-layout>
    <v-card class="mx-3">
      <v-card-text>
        <div
          style="margin-bottom: 16px;"
          xs12
          color="white"
        >
          <div style="float: left;">
            <new-user />
          </div>
          <v-flex
            xs12
            sm5
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
          :items="users"
          class="elevation-3"
          item-key="id"
          hide-actions
          id="usersTable"
        >
          <template
            slot="items"
            slot-scope="{item}"
          >
            <tr @dblclick="editItem(item.id)">
              <td class="text-xs-center">{{ item.degree }}</td>
              <td class="text-xs-center">{{ item.firstName }}</td>
              <td class="text-xs-center">{{ item.lastName }}</td>
              <td class="text-xs-center">{{ item.personalNumber }}</td>
              <td class="text-xs-center">{{ item.nick }}</td>
              <td class="text-xs-center">{{ item.dateOfOnset | dateFormat }}</td>
              <td class="text-xs-center">{{ item.personalIdentificationNumber }}</td>
              <td class="text-xs-center">{{ item.address }}</td>
              <td class="text-xs-center">{{ item.phone }}</td>
              <td class="text-xs-center">{{ item.healthInsurance }}</td>
              <td class="text-xs-center">{{ item.foodCart }}</td>
              <td class="text-xs-center">{{ item.preventiveInspection | dateFormat }}</td>
              <td class="text-xs-center">{{ item.shirtSize }}</td>
              <td class="text-xs-center">{{ item.tShirtSize }}</td>
              <td class="text-xs-center">{{ item.sizeWorkTrousers }}</td>
              <td class="text-xs-center">{{ item.sizeWorkBlouse }}</td>
              <td class="text-xs-center">{{ item.jacketSize }}</td>
              <td class="text-xs-center">{{ item.sweatshirtSize }}</td>
              <td class="text-xs-center">{{ item.shoeSize }}</td>
              <td class="text-xs-center">{{ item.halfMask }}</td>
              <td class="text-xs-center">{{ item.wardrobe }}</td>
              <td class="text-xs-center">{{ item.description }}</td>
              <td class="justify-center layout px-0">
                <edit-user :id="item.id" />
                <permission-user :id="item.id" />
                <delete-user :id="item.id" />
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

<style>
#usersTable .whiteSpace {
  white-space: inherit;
}
#usersTable .wider {
  min-width: 300px;
}
</style>


<script>
import {
  DeleteButton,
  NewButton,
  EditButton,
  PermissionButton
} from "../module/user/components";
// dodělat oprávnění té editace
import BaseMixin from "../module/user/mixin/base";
export default {
  components: {
    "new-user": NewButton,
    "edit-user": EditButton,
    "delete-user": DeleteButton,
    "permission-user": PermissionButton
  },
  mixins: [BaseMixin],
  data: () => ({
    search: "",
    headers: [
      { text: "Titul", value: "degree", align: "center", class: "whiteSpace" },
      { text: "Jméno", value: "firstName", align: "center" },
      { text: "Příjmení", value: "lastName", align: "center" },
      {
        text: "Osobní číslo",
        value: "personalNumber",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Přihlašovací jméno",
        value: "nike",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Datum nástupu",
        value: "dateOfOnset",
        align: "center"
      },
      {
        text: "Rodné číslo",
        value: "personalIdentificationNumber",
        align: "center",
        class: "whiteSpace"
      },
      { text: "Adresa", value: "address", align: "center", class: "wider" },
      { text: "Telefon", value: "phone", align: "center" },
      {
        text: "Zdravotní pojišťovna",
        value: "healthInsurance",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Karta strávníka",
        value: "foodCart",
        align: "center",
        class: "whiteSpace"
      },
      {
        text: "Preventivní prohlídka",
        value: "preventiveInspection",
        align: "center",
        class: "whiteSpace"
      },
      { text: "Tričko", value: "shirtSize", align: "center" },
      { text: "Košile", value: "tShirtSize", align: "center" },
      {
        text: "Kalhoty",
        value: "sizeWorkTrousers",
        align: "center"
      },
      {
        text: "Blůza",
        value: "sizeWorkBlouse",
        align: "center"
      },
      { text: "Bunda", value: "jacketSize", align: "center" },
      { text: "Mikina", value: "sweatshirtSize", align: "center" },
      { text: "Boty", value: "shoeSize", align: "center" },
      { text: "Polomaska", value: "halfMask", align: "center" },
      {
        text: "Šatní skříňka",
        value: "wardrobe",
        align: "center",
        class: "whiteSpace"
      },
      { text: "Poznámka", value: "description", align: "center" },
      { text: "Akce", value: "action", align: "center" }
    ]
  }),
  computed: {
    users() {
      return this.$store.state.user.users;
    }
  },
  created() {
    this.$store.dispatch("loadAllUsers");
  },
  watch: {},
  methods: {}
};
</script>