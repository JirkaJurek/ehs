import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
// axios.defaults.baseURL = location.origin;


export const editItem = (store, itemId = -1, duplicate = false) => {
  itemId = parseInt(itemId);
  if (this.$refs.dialogNewItem) {
    this.$refs.dialogNewItem.open(itemId, duplicate);
  } else {
    const selfRefs = this.$refs;
    setTimeout(function() {
      selfRefs.dialogNewItem.open(itemId, duplicate);
    }, 300);
  }
  store.commit("setMainModal", SetItemModal);
}

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};
