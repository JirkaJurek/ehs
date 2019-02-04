<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Přihlášení</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form ref="form">
          <v-layout column>
            <v-flex>
              <v-text-field :rules="inputRequired" v-model="username" label="Uživatelské jméno" type="text"></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field :rules="inputRequired" v-model="password" label="Heslo" type="password"></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" @click="login">Přihlásit se</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    inputRequired: [v => !!v || "Povinné pole"],
    username: "",
    password: ""
  }),
  computed: {},
  created() {},
  watch: {},
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        let response;
        try {
          response = await this.axios.post("/login", {
            username: this.username,
            password: this.password
          });
          localStorage.basicToken = response.data.basicToken;
          location.href = "/";
        } catch (err) {
          alert("Nepovedené přihlášení");
        }
      }
    }
  }
};
</script>