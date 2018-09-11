import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import DialogTool from './components/DialogTool.vue'
import Super from './components/Super.vue'

Vue.config.productionTip = false

Vue.component('dialog-tool', DialogTool);
Vue.component('super', Super);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
