import { length } from "ramda";
import axios from "../myAxios";
import { getDefaultMove } from "../module/stock/index";

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
