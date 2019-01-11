<template>
  <v-dialog :value="true" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Oprávnění</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md3 v-for="permission in permissions" v-bind:key="permission.id">
              <v-switch v-model="editedUserPermission" :label="permission.name" :value="permission.id"></v-switch>
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
  props: ["userPermission", "userId"],
  data: () => ({
    editedUserPermission: []
  }),
  computed: {
    permissions() {
      return this.$store.state.user.permissions;
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