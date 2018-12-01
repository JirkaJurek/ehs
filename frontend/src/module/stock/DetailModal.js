import DataTableItems from "./DataTableItems";
import { returnAllTools } from "./index";
const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};
export default {
  props: ["myData"],
  functional: true,
  render(createElement, context) {
    const { props, parent } = context;
    const close = () => {
      parent.$store.commit("setMainModal", null);
    };
    const returnAll = () => {
      returnAllTools(parent.$store, props.myData.item.id)
    }
    console.log(props.myData);
    return (
      <v-dialog value={true} persistent>
        <v-card>
          <v-card-title>
            <span class="headline">
              Detail {props.myData.item.exporter == 0 ? "přijímky" : "výdejky"}
            </span>
          </v-card-title>
          <v-card-text>
            <DataTableItems
              items={toJson(props.myData.item.items)}
              type={props.myData.item.type}
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            {props.myData.item.type == 2 ? (
              <v-btn color="blue darken-1" flat onClick={returnAll}>
                Vrátit všechno zboží
              </v-btn>
            ) : (
              ""
            )}
            <v-btn color="blue darken-1" flat onClick={close}>
              Zrušit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    );
  }
};
