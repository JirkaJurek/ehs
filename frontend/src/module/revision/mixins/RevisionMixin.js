const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

import { DialogRevisionType } from "../components";
export default {
  methods: {
    async editItem(id = 0, defaultItem= {}) {
      if (id) {
        defaultItem.revisionInterval = toJson(defaultItem.revisionInterval);
      }
      this.$store.commit(
        "setComponent",
        <DialogRevisionType defaultItem={defaultItem} id={id} />
      );
    }
  }
};
