import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "./myAxios";
import VueAxios from "vue-axios";
import { format as dateFormat } from "date-fns";
// ACL
import { abilitiesPlugin } from "@casl/vue";
import { define } from "./resources/ability";
//

import VueUploadComponent from "vue-upload-component";
import DialogTool from "./components/DialogTool.vue";
import Super from "./components/Super.vue";
import UploadFile from "./module/file/components/UploadFile.vue";
import RevisionTool from "./components/RevisionTool.vue";
import ShowFiles from "./components/ShowFiles.vue";
import SortTreeHack from "./sortTreeHack";
import DialogToolService from "./components/DialogToolService";
import ToolItems from "./components/ToolItems";
import StockToolbarButton from "./module/stock/ToolbarButton";
import DateRangePicker from "./components/DateRangePicker.vue";

// import "./plugins/tool.js";

Vue.config.productionTip = false;

Vue.component("file-upload", VueUploadComponent);
Vue.component("dialog-tool", DialogTool);
Vue.component("super", Super);
Vue.component("upload-file", UploadFile);
Vue.component("revision-tool", RevisionTool);
Vue.component("show-files", ShowFiles);
Vue.component("sort-tree", SortTreeHack);
Vue.component("dialog-tool-service", DialogToolService);
Vue.component("tool-items", ToolItems);
Vue.component("stock-toolbar-button", StockToolbarButton);
Vue.component("date-range-picker", DateRangePicker);
Vue.filter("dateFormat", (date, format = "D. M. YY") => {
  return dateFormat(date, format);
});
Vue.filter("employeeName", (item, defaultValue = "") => {
  return item
    ? `${item.degree} ${item.firstName} ${item.lastName}`
    : defaultValue;
});
Vue.mixin({
  methods: {
    toJson(data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
  }
});
Vue.use(VueAxios, axios);

store.dispatch("loginUserByToken").finally(() => {
  const abilities = define();
  Vue.use(abilitiesPlugin, abilities);

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
})
