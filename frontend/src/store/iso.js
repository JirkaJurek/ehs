import axios from "../myAxios";

export default {
  state: {
    formIf: [],
    directiveOs: [],
    decisionRjs: [],
  },
  getters: {},
  mutations: {},
  actions: {
    async loadAllIso({ state }, { reload = false, types = [] }) {
      types.forEach(type => {
        if (reload || state[type].length === 0) {
          axios
            .get("/iso", {
              params: {
                filter: {
                  types: [type]
                }
              }
            })
            .then(response => {
              state[type] = response.data;
            });
        }
      });
    }
  }
};
