import { length } from "ramda";
import axios from "axios";
import { getDefaultMove } from "../module/stock/index";
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
// axios.defaults.baseURL = location.origin;

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

export default {
  state: {
    moveItems: getDefaultMove(),
    moveStock: []
  },
  getters: {
    getNumberItems: state => () => {
      return state.moveItems.items ? length(state.moveItems.items) : 0;
    }
  },
  mutations: {
    setMove(state, fullNewObject) {
      state.moveItems = fullNewObject;
    }
  },
  actions: {
    async allMoveStock({ state }) {
      axios.get("/tools/move").then(response => {
        state.moveStock = response.data;
      });
    }
  }
};
