import axios from "../myAxios";

export default {
  state: {
    tasks: []
  },
  getters: {},
  mutations: {},
  actions: {
    async loadAllTasks({ state }, reload = false) {
      if (reload || state.tasks.length === 0) {
        axios.get("/task").then(response => {
          state.tasks = response.data;
        });
      }
    }
  }
};
