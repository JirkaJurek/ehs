import {
  find,
  propEq,
} from "ramda";
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL

export default {
  state: {
    suppliers: ['Houfek', 'Lenovo'],
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
    columns: [
      { text: "Dodavatel", value: "supplier" },
      { text: "Kategorie", value: "categories" },
      { text: "Název stroje", value: "name" },
      { text: "Revizní karta el. nářadí", value: "revisionCard" },
      { text: "Uvedeno do provozu", value: "startWork" },
      { text: "Sériové číslo/rok výroby", value: "seriesNumber" },
      { text: "Interní – dle plánu – FB 6_0025", value: "internal" },
      { text: "Externí", value: "external" },
      {
        text: "Časový interval – externí údržba",
        value: "externalMaintenance"
      },
      { text: "Další údržba", value: "nextRevision" },
      { text: "Poznámka", value: "comment" },
      { text: "Zaměstnanec", value: "employeeId" },
      { text: "Revize", value: "revisions" },
      { text: "Na skladě", value: "inStock" },
      { text: "Actions", align: "center", value: "actions", sortable: false }
    ],
    tools: []
  },
  getters: {
    getCategoryById: (state) => (id) => {
      return find(propEq('id', id), state.categories);
    }
  },
  mutations: {

  },
  actions: {
    async loadAllTool({ state }, data = {}) {
      axios.get("/tools", {
        params: data.params
      }).then(response => {
        state.tools = response.data;
      });
    }
  }
}
