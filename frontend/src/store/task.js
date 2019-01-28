import axios from "../myAxios";

export default {
  state: {
    tasks: [],
    filter: {}
  },
  getters: {},
  mutations: {},
  actions: {
    async loadAllTasks({ state }, props = {}) {
      const { reload = false, getParams, isGlobalFilter = true } = props;
      const getQuery = getParams || state.filter;
      if (isGlobalFilter) {
        state.filter = getQuery;
      }
      if (reload || state.tasks.length === 0) {
        axios
          .get("/task", {
            params: getQuery
          })
          .then(response => {
            state.tasks = response.data;
          });
      }
    }
  }
};
