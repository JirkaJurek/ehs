import {
  find,
  propEq,
} from "ramda";

export default {
  state: { 
    categories: []
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
