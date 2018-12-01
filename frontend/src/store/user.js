import { find, propEq } from "ramda";

export default {
  state: {
    users: [
      { id: 1, name: "Sklad" },
      { id: 2, name: "Uklízečka" },
      { id: 3, name: "Modelář" },
      { id: 4, name: "Tester" }
    ]
  },
  getters: {
    getUserById: state => id => {
      return find(propEq("id", id), state.users);
    }
  },
  mutations: {},
  actions: {}
};
