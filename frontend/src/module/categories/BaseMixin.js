import DialogCategory from "./DialogCategory.vue";
export default {
  methods: {
    async newCategory(parentId) {
      this.$store.commit(
        "setComponent",
        <DialogCategory defaultItem={{parentId: parentId}} />
      );
    }
  }
};
