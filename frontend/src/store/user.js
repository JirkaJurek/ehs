import { find, propEq } from "ramda";
import axios from "../myAxios";

export default {
  state: {
    users: [],
    currentUser: {},
    permissions: []
  },
  getters: {
    getUserById: state => id => {
      return find(propEq("id", id), state.users);
    },
    getCurrentUser: state => () => {
      return state.currentUser;
    }
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
    }
  },
  actions: {
    async loginUserByToken({ state }) {
      const response = await axios.post("/permissions");
      if (!response.data.status) {
        localStorage.basicToken = "";
      } else {
        state.currentUser = response.data;
      }
    },
    async loadAllUsers({ state }, reload = false) {
      if (reload || state.users.length === 0) {
        axios.get("/users").then(response => {
          state.users = response.data;
        });
      }
    },
    async loadAllPermissions({ state }, reload = false) {
      if (reload || state.permissions.length === 0) {
        axios.get("/users/permissions").then(response => {
          state.permissions = response.data;
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
