import {
  find,
  propEq,
} from "ramda";

export default {
  state: { 
    suppliers: [ 'Houfek', 'Lenovo'],
    categories: [
      { value: 1, text: "CNS" },
      { value: 2, text: "Ruční nářadí" },
      { value: 3, text: "Pily" }
    ],
    revisionInterval: [
      { value: "1 y", text: "Roční" },
      { value: "6 m", text: "Půlroční" },
      { value: "1 m", text: "Měsíční" },
      { value: "7 d", text: "Týdení" },
      {
        value: "",
        text: "Vlastní pište ve tvaru (y,m,d) např. Roční = 1 y, Měsíční = 1 m",
        disabled: true
      }
    ],
  },
  getters: {
    getCategoryById: (state) => (id) => {
      return find(propEq('id', id), state.categories);
    }
  },
  mutations: {

  },
  actions: {

  }
}
