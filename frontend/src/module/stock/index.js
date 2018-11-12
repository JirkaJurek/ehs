import { isArray, isNumber, isBoolean } from "ramda-adjunct";
import { clone, slice } from "ramda";
import SetItemModal from "./SetItemModal";
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
// axios.defaults.baseURL = location.origin;

export const defaultItem = {
  items: [],
  type: 0,
  exporter: false
};
const types = [
  { text: "Nové nástroje", value: 0 },
  { text: "Návrat nástrojů", value: 1 },
  { text: "Výdej nástrojů", value: 2 },
  { text: "Odpis nástrojů", value: 3 }
];
export const cleanMove = store => {
  store.commit("setMove", getDefaultMove());
};
export const getDefaultMove = () => {
  return clone(defaultItem);
};
export const newMove = store => {
  cleanMove(store);
};
export const addItem = (store, newItem) => {
  const item = isCorrectOrRepair(store.state.stock.moveItems);
  // pokud už tu je stejný toolId a stejný zaměstnanec, tak se počty pouze sečtou
  item.items.push(newItem);
  store.commit("setMove", item);
};
export const setExporter = (store, exporter) => {
  let item = isCorrectOrRepair(store.state.stock.moveItems);
  item.exporter = exporter;
  store.commit("setMove", item);
};
export const setType = (store, type) => {
  let item = isCorrectOrRepair(store.state.stock.moveItems);
  item.type = type;
  store.commit("setMove", item);
};
export const deleteItemByIndex = (store, index) => {
  let item = isCorrectOrRepair(store.state.stock.moveItems);
  item.items.splice(index, 1);
  store.commit("setMove", item);
};
export const getItemVariant = (store, tool) => {
  const toolItems = toJson(tool.items);
  if (store.state.stock.moveItems.exporter && toolItems) {
    if (toolItems.length === 1) {
      if (toolItems[0].count == 1) {
        let item = toolItems[0];
        item.toolId = item['id_tool']
        item.employee = toJson(item.employee)
        addItem(store, item);
        return true;
      }
      // modal jen s výběrem počtu kusu
    }
    // modal s počtem kusu a výběrem skladu

    // kontrola jestli je sklad vybraný, případně pokud ano a je tam jen jeden kus, tak přidat automaticky

    // vrátit správný počet kusu který je ještě možno vybrat

    // vytvořit správný formát pro položku

    // kontrola toho jestli se jedná o přijímku nebo výdejku, podle toho se to taky chová jinak
  }
  SetItemModal.myData = {
    toolId: tool.id
  };
  store.commit("setMainModal", SetItemModal);
};

export const isCorrect = item => {
  const result = [];
  if (item) {
    isArray(item.items) || result.push("items");
    isNumber(item.type) || result.push("type");
    isBoolean(item.exporter) || result.push("exporter");
  } else {
    result.push("item");
  }
  return result;
};
export const isCorrectOrRepair = item => {
  const errors = isCorrect(item);
  if (errors.includes("item")) {
    return getDefaultMove;
  }
  if (errors.includes("items")) {
    item.images = [];
  }
  if (errors.includes("type")) {
    item.type = 0;
  }
  if (errors.includes("exporter")) {
    item.exporter = false;
  }
  return item;
};
export const createMove = store => {
  axios.post("/tools/move", store.state.stock.moveItems).then(() => {
    //inicializovat novou historii skladů
    store.dispatch("loadAllTool");
  });
  cleanMove(store);
  store.commit("setMainModal", null);
};
export const getPossibleTypes = store => {
  return store.state.stock.moveItems.exporter
    ? slice(2, 4, types)
    : slice(0, 2, types);
};

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};
