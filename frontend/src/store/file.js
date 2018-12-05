import axios from "../myAxios";

/*
const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};
*/

export default {
  state: {
    files: [],
    filter: {}
  },
  getters: {},
  mutations: {},
  actions: {
    async loadFiles({ state }, getParams, isGlobalFilter = true) {
      getParams = getParams || state.filter;
      if (isGlobalFilter) {
        state.filter = getParams;
      }
      axios
        .get("/files", {
          params: getParams
        })
        .then(response => {
          state.files = response.data;
        });
    }
  }
};
