import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "./myAxios";
import VueAxios from "vue-axios";

import VueUploadComponent from "vue-upload-component";
import DialogTool from "./components/DialogTool.vue";
import Super from "./components/Super.vue";
import UploadFile from "./components/UploadFile.vue";
import RevisionTool from "./components/RevisionTool.vue";
import ShowFiles from "./components/ShowFiles.vue";
import SortTreeHack from "./sortTreeHack";
import DialogToolRevisionType from "./components/DialogToolRevisionType";
import DialogToolService from "./components/DialogToolService";
import ToolItems from "./components/ToolItems";
import StockToolbarButton from "./module/stock/ToolbarButton";
import ExporterButton from "./module/stock/ExporterButton";
import ReceiverButton from "./module/stock/ReceiverButton";


// import "./plugins/tool.js";

Vue.config.productionTip = false;

Vue.component("file-upload", VueUploadComponent);
Vue.component("dialog-tool", DialogTool);
Vue.component("super", Super);
Vue.component("upload-file", UploadFile);
Vue.component("revision-tool", RevisionTool);
Vue.component("show-files", ShowFiles);
Vue.component("sort-tree", SortTreeHack);
Vue.component("dialog-tool-revision-type", DialogToolRevisionType);
Vue.component("dialog-tool-service", DialogToolService);
Vue.component("tool-items", ToolItems);
Vue.component("stock-toolbar-button", StockToolbarButton);
Vue.component("stock-exporter-button", ExporterButton);
Vue.component("stock-receiver-button", ReceiverButton);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
