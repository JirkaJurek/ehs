import axios from "../myAxios";

export default {
  state: {
    warehouses: []
  },
  getters: {},
  mutations: {},
  actions: {
    async loadAllWarehouses({ state }, reload = false) {
      if (reload || state.warehouses.length === 0) {
        axios.get("/warehouse").then(response => {
          state.warehouses = response.data;
        });
      }
    }
  }
};
