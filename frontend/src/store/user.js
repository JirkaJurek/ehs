import { find, propEq } from "ramda";
import axios from "../myAxios";

export default {
  state: {
    users: [],
    currentJWT: ""
  },
  getters: {
    getUserById: state => id => {
      return find(propEq("id", id), state.users);
    }
  },
  mutations: {
    setJWT(state, jwt) {
      state.currentJWT = jwt;
    }
  },
  actions: {
    async loadAllUsers({ state }, reload = false) {
      if (reload || state.users.length === 0) {
        axios.get("/users").then(response => {
          state.users = response.data;
        });
      }
    },
    async login({ commit }, { username, password }) {
      const res = await axios.post("/users/login", {
        username,
        password
      });
      commit("setJWT", await res.data());
    }
  }
};
