import Vue from 'vue'
import Vuex from 'vuex'
import allStore from './store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: allStore,
  state: {
    mainModal: null
  },
  mutations: {
    setMainModal(state, modal) {
      console.log(modal)
      state.mainModal = modal;
    },
  },
  actions: {

  }
})
