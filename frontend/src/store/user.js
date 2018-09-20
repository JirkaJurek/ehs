import {
  map,
} from "ramda";

export default {
  state: { 
    users: [
      { id: 1, name: "Tester" },
      { id: 2, name: "Uklízečka" },
      { id: 3, name: "Modelář" }
    ]
  },
  getters: {
    getUsersForSelect: (state) => {
      return map(user => {
        return {value: user.id, text: user.name}
      }, state.users)
    }
  },
  mutations: {

  },
  actions: {

  }
}
