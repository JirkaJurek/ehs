import { DialogMobileTariffs } from "../components";
export default {
  methods: {
    async editItem(id = 0) {
      let mobile = {};
      if (id) {
        const result = await this.axios.get(`/address-book/mobile-tariffs/${id}`);
        mobile = {
          ...result.data,
          isCompanyPhone: result.data.isCompanyPhone === "1"
        };
      }
      this.$store.commit(
        "setComponent",
        <DialogMobileTariffs defaultItem={mobile} id={id} />
      );
    },
  }
};
