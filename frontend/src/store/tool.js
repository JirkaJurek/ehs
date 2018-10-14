import {
  find,
  propEq,
  props,
  prop,
  groupBy,
  pipe,
  map,
  applySpec,
  lensProp,
  filter,
  omit
} from "ramda";
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;

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
    categoriesa: [
      { id: 1, value: 1, text: "CNC", children: [] },
      { id: 2, value: 2, text: "Ruční nářadí", children: [] },
      { id: 3, value: 3, text: "Pily", children: [] }
    ],
    revisionInterval: [
      { value: "1 y", text: "Roční" },
      { value: "6 m", text: "Půlroční" },
      { value: "1 m", text: "Měsíční" },
      { value: "7 d", text: "Týdení" },
      {
        value: "",
        text: "Vlastní pište ve tvaru (y,m,d) např. Roční = 1 y, Měsíční = 1 m",
        disabled: true
      }
    ],
    columns: [
      { text: "Dodavatel", value: "supplier" },
      { text: "Kategorie", value: "categories" },
      { text: "Název stroje", value: "name" },
      { text: "Revizní karta el. nářadí", value: "revisionCard" },
      { text: "Uvedeno do provozu", value: "startWork" },
      { text: "Sériové číslo", value: "seriesNumber" },
      { text: "Inventární číslo", value: "inventoryNumber" },
      { text: "Označení/číslo stroje", value: "machineNumber" },
      { text: "Rok výroby", value: "yearOfManufacture" },
      { text: "Poznámka", value: "comment" },
      { text: "Zaměstnanec", value: "employeeId" },
      { text: "Revize", value: "revisions" },
      { text: "Na skladě", value: "inStock" },
      { text: "Soubory", value: "files" },
      { text: "Actions", align: "center", value: "actions", sortable: false }
    ],
    tools: [],
    filter: { test: "test" },
    alreadyInitialized: false
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
    getCategoriesTransformSelect: state => () => {
      return map(category => {
        return {
          value: parseInt(prop("id", category)),
          text: prop("name", category)
        };
      }, state.categories);
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
    async inicialize({ state }, only = ["suppliers", "categories"]) {
      if (!state.alreadyInitialized) {
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
          }
        };
        for (let item of props(only, items)) {
          item();
        }
      }
      state.alreadyInitialized = true;
    }
  }
};
