<template>
  <v-dialog :value="true" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Oprávnění</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm6 md3>
              <v-switch v-model="selectAll" label="Povilit veškerá oprávnění"></v-switch>
            </v-flex>
            <v-flex xs12 v-for="(permissionInCategory, category) in groupPermissionByCategory" v-bind:key="category">
              {{category}}
              <v-layout row wrap>
                <v-flex xs12 sm6 md3 v-for="permission in permissionInCategory" v-bind:key="permission.id">
                  <v-switch v-model="editedUserPermission" :label="permission.name" :value="permission.id"></v-switch>
                </v-flex>
              </v-layout>
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
import { groupBy, prop } from "ramda";
export default {
  props: ["userPermission", "userId"],
  data: () => ({
    editedUserPermission: [],
    selectAll: false
  }),
  computed: {
    permissions() {
      return this.$store.state.user.permissions;
    },
    groupPermissionByCategory() {
      return groupBy(prop("category"), this.permissions);
    }
  },
  created() {
    this.editedUserPermission = this.userPermission;
    this.$store.dispatch("loadAllPermissions");
  },
  methods: {
    close() {
      this.$store.commit("setComponent", null);
    },
    save() {
      let url = `/users/${this.userId}/permission`;
      this.axios.post(url, this.editedUserPermission).then(response => {
        this.$store.dispatch("loadAllUsers", true);
      });
      this.close();
    }
  }
};
</script>