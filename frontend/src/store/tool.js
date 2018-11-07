import { find, propEq, props, filter } from "ramda";
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
// axios.defaults.baseURL = location.origin;

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

let loadAllToolSetTimeout;

export default {
  state: {
    suppliers: ["Houfek", "Lenovo"],
    categories: [],
    revisionInterval: [
      { value: "3 month", text: "3 měsíce" },
      { value: "6 month", text: "6 měsíců" },
      { value: "12 month", text: "12 měsíců" },
      { value: "24 month", text: "24 měsíců" },
      { value: "36 month", text: "36 měsíců" },
      { value: "48 month", text: "48 měsíců" },
      { value: "60 month", text: "60 měsíců" },
    ],
    columns: [
      { text: "Dodavatel", value: "supplier" },
      { text: "Kategorie", value: "categories" },
      { text: "Název stroje", value: "name", class: "wider" },
      { text: "Revizní karta el. nářadí", value: "revisionCard", class: "whiteSpace"},
      { text: "Uvedeno do provozu", value: "startWork", class: "whiteSpace" },
      { text: "Sériové číslo", value: "seriesNumber" },
      { text: "Inventární číslo", value: "inventoryNumber" },
      { text: "Označení/číslo stroje", value: "machineNumber", class: "whiteSpace" },
      { text: "Rok výroby", value: "yearOfManufacture" },
      { text: "Poznámka", value: "comment" },
      { text: "Klíčové slovo 1", value: "filter1", class: "whiteSpace" },
      { text: "Klíčové slovo 2", value: "filter2", class: "whiteSpace" },
      { text: "Klíčové slovo 3", value: "filter3", class: "whiteSpace" },
      // { text: "Zaměstnanec", value: "employeeId" },
      { text: "Revize", value: "revisions" },
      //{ text: "Na skladě", value: "inStock" },
      { text: "Cena", value: "price" },
      { text: "Celkový počet / skladem", value: "count", class: "whiteSpace" },
      { text: "Soubory", value: "files" },
      { text: "Actions", align: "center", value: "actions", sortable: false }
    ],
    tools: [],
    filter: { test: "test" },
    revisionType: []
  },
  getters: {
    getCategoryById: state => id => {
      return find(propEq("id", id), state.categories);
    },
    getCategoriesTransformTree: state => () => {
      const categories = state.categories.map(category => {
        category.id = parseInt(category.id);
        category.parentId = category.parentId
          ? parseInt(category.parentId)
          : null;
        return category;
      });
      const findChildren = myId => filter(propEq("parentId", myId), categories);
      const root = findChildren(null);
      const getTree = a => {
        return a.map(item => {
          item.children = findChildren(item.id);
          if (item.children) {
            item.children = getTree(item.children);
          }
          return item;
        });
      };
      return getTree(root);
    },
    getAllRevisionById: state => id => {
      const tool = find(propEq("id", id), state.tools);
      return tool ? toJson(tool.revisions) : [];
    },
    getFilesById: state => id => {
      const tool = find(propEq("id", id), state.tools);
      return tool && tool.files ? toJson(tool.files) : [];
    }
  },
  mutations: {
    newSupplier(state, name) {
      state.suppliers.splice(0, 0, name);
      axios.post("/config/edit-by-name", {
        name: "tool.supplier",
        data: state.suppliers
      });
    },
    async newCategory(state, data) {
      await axios.post("/tools/categories", data);
      const result = await axios.get("/tools/categories");
      state.categories = result.data;
    }
  },
  actions: {
    async loadAllTool({ state }, getParams, isGlobalFilter = true) {
      getParams = getParams || state.filter;
      if (isGlobalFilter) {
        state.filter = getParams;
      }
      if (loadAllToolSetTimeout) {
        clearTimeout(loadAllToolSetTimeout);
      }
      loadAllToolSetTimeout = setTimeout(() => {
        axios
          .get("/tools", {
            params: getParams
          })
          .then(response => {
            state.tools = response.data;
          });
      }, 500);
    },
    async inicialize(
      { state },
      only = ["suppliers", "categories", "loadAllRevisionType"]
    ) {
      const items = {
        suppliers: () => {
          axios
            .get("/config", {
              params: {
                name: "tool.supplier"
              }
            })
            .then(response => {
              if (response.data[0]) {
                state.suppliers = toJson(response.data[0].data);
              }
            });
        },
        categories: async () => {
          const result = await axios.get("/tools/categories");
          state.categories = result.data;
        },
        loadAllRevisionType: async () => {
          const result = await axios.get("/tools/revision-type");
          state.revisionType = result.data;
        }
      };
      for (let item of props(only, items)) {
        item();
      }
    }
  }
};
