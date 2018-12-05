import DialogUser from "./DialogUser.vue";
export default {
  methods: {
    async editItem(id = 0) {
      let user = {};
      if (id) {
        const result = await this.axios.get(`/users/${id}`);
        user = result.data;
        console.log(user);
      }
      this.$store.commit(
        "setComponent",
        <DialogUser defaultItem={user} id={id} />
      );
    }
  }
};
