const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

import { DialogRevision } from "../components/dialog";
export default {
  methods: {
    async editItem(id = 0, defaultItem = {}, selectedIds = []) {
      if (id) {
        defaultItem = {
          ...toJson(defaultItem),
          revisionType: this.toJson(defaultItem.revisionType),
          files: this.toJson(defaultItem.files)
        };
      }
      this.$store.commit(
        "setComponent",
        <DialogRevision defaultItem={defaultItem} id={id} selectedIds={selectedIds} />
      );
    }
  }
};
