import axios from "axios";
// axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
axios.defaults.baseURL = location.origin;

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
