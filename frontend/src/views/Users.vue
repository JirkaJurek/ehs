<template>
  <div>
    <v-layout my-3 display-2 align-center justify-center>Přehled zaměstnanců</v-layout>
    <v-card class="mx-3">
      <v-card-text>
        <div xs12 color="white">
          <new-user />
        </div>
        <v-data-table :search=search :headers="headers" :items="users" class="elevation-3" item-key="id" hide-actions>
          <template slot="items" slot-scope="{item}">
            <tr>
              <td class="text-xs-center">{{ item.degree }}</td>
              <td class="text-xs-center">{{ item.firstName }}</td>
              <td class="text-xs-center">{{ item.lastName }}</td>
              <td class="text-xs-center">{{ item.personalNumber }}</td>
              <td class="text-xs-center">{{ item.nick }}</td>
              <td class="text-xs-center">{{ item.wardrobe }}</td>
              <td class="text-xs-center">{{ item.shirtSize }}</td>
              <td class="text-xs-center">{{ item.tShirtSize }}</td>
              <td class="text-xs-center">{{ item.sizeWorkTrousers }}</td>
              <td class="text-xs-center">{{ item.sizeWorkBlouse }}</td>
              <td class="text-xs-center">{{ item.jacketSize }}</td>
              <td class="text-xs-center">{{ item.sweatshirtSize }}</td>
              <td class="text-xs-center">{{ item.shoeSize }}</td>
              <td class="text-xs-center">{{ item.description }}</td>
              <td class="justify-center layout px-0">
                <edit-user :id="item.id" />
                <permission-user :id="item.id" />
                <delete-user :id="item.id" />
              </td>
            </tr>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Nebyl nalezen žádný výsledek pro výraz "{{ search }}".
          </v-alert>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  DeleteButton,
  NewButton,
  EditButton,
  PermissionButton
} from "../module/user/components";
export default {
  components: {
    "new-user": NewButton,
    "edit-user": EditButton,
    "delete-user": DeleteButton,
    "permission-user": PermissionButton
  },
  data: () => ({
    search: "",
    headers: [
      { text: "Titul", value: "degree", align: "center" },
      { text: "Jméno", value: "firstName", align: "center" },
      { text: "Příjmení", value: "lastName", align: "center" },
      { text: "Osobní číslo", value: "personalNumber", align: "center" },
      { text: "Přihlašovací jméno", value: "nike", align: "center" },
      { text: "Šatní skříňka", value: "wardrobe", align: "center" },
      { text: "Velikost trička", value: "shirtSize", align: "center" },
      { text: "Velikost košile", value: "tShirtSize", align: "center" },
      { text: "Velikost monterkových kalhot", value: "sizeWorkTrousers", align: "center" },
      { text: "Velikost monterkových blůzy", value: "sizeWorkBlouse", align: "center" },
      { text: "Velikost bundy", value: "jacketSize", align: "center" },
      { text: "Velikost mikiny", value: "sweatshirtSize", align: "center" },
      { text: "Velikost boty", value: "shoeSize", align: "center" },
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