import { find, propEq } from "ramda";
import axios from "../myAxios";
console.log(axios)

export default {
  state: {
    users: []
  },
  getters: {
    getUserById: state => id => {
      return find(propEq("id", id), state.users);
    }
  },
  mutations: {},
  actions: {
    async loadAllUsers({ state }, reload = false) {
      if (reload || state.users.length === 0) {
        axios.get("/users").then(response => {
          state.users = response.data;
        });
      }
    }
  }
};
