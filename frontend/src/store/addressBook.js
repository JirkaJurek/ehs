import axios from "../myAxios";

export default {
  state: {
    mobileTariffs: []
  },
  getters: {},
  mutations: {},
  actions: {
    async loadAllMobileTariffs({ state }, reload = false) {
      if (reload || state.mobileTariffs.length === 0) {
        axios.get("/address-book/mobile-tariffs").then(response => {
          state.mobileTariffs = response.data;
        });
      }
    }
  }
};
