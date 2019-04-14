import {
  DialogIso,
  DialogShowRevision,
  DialogAddRevision
} from "../components";
export default {
  methods: {
    async editItem(type, id = 0) {
      let iso = {
        type
      };
      if (id) {
        const result = await this.axios.get(`/iso/${id}`);
        iso = {
          ...result.data
        };
      }
      this.$store.commit(
        "setComponent",
        <DialogIso type={iso.type} defaultItem={iso} id={id} />
      );
    },
    async showRevision(idIso) {
      const result = await this.axios.get(`/iso/${idIso}/revisions`);

      this.$store.commit(
        "setComponent",
        <DialogShowRevision revisions={result.data} idIso={idIso} />
      );
    },
    async addRevision(idIso) {
      this.$store.commit("setComponent", <DialogAddRevision idIso={idIso} />);
    }
  }
};
