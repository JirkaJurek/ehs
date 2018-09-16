import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import DialogTool from './components/DialogTool.vue'
import Super from './components/Super.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
 
Vue.component('dialog-tool', DialogTool);
Vue.component('super', Super);

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
