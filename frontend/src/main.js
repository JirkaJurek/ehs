import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'


import VueUploadComponent from 'vue-upload-component'
import DialogTool from './components/DialogTool.vue'
import Super from './components/Super.vue'
import UploadFile from './components/UploadFile.vue'
import RevisionTool from './components/RevisionTool.vue'
import ShowFiles from './components/ShowFiles.vue'
import SortTreeHack from './sortTreeHack'
import DialogToolRevisionType from './components/DialogToolRevisionType'

Vue.config.productionTip = false

Vue.component('file-upload', VueUploadComponent)
Vue.component('dialog-tool', DialogTool);
Vue.component('super', Super);
Vue.component('upload-file', UploadFile);
Vue.component('revision-tool', RevisionTool);
Vue.component('show-files', ShowFiles);
Vue.component('sort-tree', SortTreeHack);
Vue.component('dialog-tool-revision-type', DialogToolRevisionType);

axios.defaults.baseURL = location.origin
//axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
