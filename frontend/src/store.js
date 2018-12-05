import Vue from 'vue'
import Vuex from 'vuex'
import allStore from './store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: allStore,
  state: {
    mainModal: null,
    component: null,
  },
  mutations: {
    setMainModal(state, modal) {
      state.mainModal = modal;
    },
    setComponent(state, component) {
      state.component = component;
    },
  },
  actions: {

  }
})
