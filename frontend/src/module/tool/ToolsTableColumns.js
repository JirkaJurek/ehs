import { add, map, addIndex, reduce } from "ramda";

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};
const mapIndexed = addIndex(map);

//tahle funkce by chtěla předělat 
const toolItemsCount = data => {
  let text = "0 / 0 / 0";
  if (data) {
    const items = toJson(data);
    const { count, inStock } = reduce(
      (acc, item) => {
        return {
          count: add(acc.count, item.count),
          inStock: add(acc.inStock, item.inStock)
        };
      },
      { count: 0, inStock: 0 },
      items
    );
    text = `${count} / ${inStock} / ${count - inStock}`;
  }

  return text;
};

export default {
  functional: true,
  props: {
    visibleColumns: {
      type: Array
    },
    item: {
      type: Object
    },
    visibleActions: {
      type: Array
    }
  },
  render(createElement, { props }) {
    const { visibleColumns = [], item, visibleActions = [] } = props;
    const revisions = toJson(item.revisions);
    const actions = {
      revert: (
        <v-icon small onClick="revertItem(props.item.id)" title="Vrátit zpět">
          cached
        </v-icon>
      ),
      edit: (
        <v-icon
          small
          class="mr-2"
          onClick="editItem(props.item.id)"
          title="Editace"
        >
          edit
        </v-icon>
      ),
      clone: (
        <v-icon
          small
          class="mr-2"
          onClick="editItem(props.item.id, true)"
          title="Klonovat"
        >
          filter_none
        </v-icon>
      ),
      delete: (
        <v-icon small onClick="deleteItem(props.item.id)" title="Smazat">
          delete
        </v-icon>
      )
    };
    const columns = {
      supplier: <td class="text-xs-center">{item.supplier}</td>,
      name: <td class="text-xs-center">{item.name}</td>,
      shortName: <td class="text-xs-center">{item.shortName}</td>,
      revisionCard: <td class="text-xs-center">{item.revisionCard}</td>,
      startWork: <td class="text-xs-center">{item.startWork}</td>,
      seriesNumber: <td class="text-xs-center">{item.seriesNumber}</td>,
      inventoryNumber: <td class="text-xs-center">{item.inventoryNumber}</td>,
      code: <td class="text-xs-center">{item.code}</td>,
      machineNumber: <td class="text-xs-center">{item.machineNumber}</td>,
      yearOfManufacture: (
        <td class="text-xs-center">{item.yearOfManufacture}</td>
      ),
      comment: <td class="text-xs-center">{item.comment}</td>,
      filter1: <td class="text-xs-center">{item.filter1}</td>,
      filter2: <td class="text-xs-center">{item.filter2}</td>,
      filter3: <td class="text-xs-center">{item.filter3}</td>,
      price: <td class="text-xs-center">{item.price}</td>,
      categories: (
        <td class="text-xs-center">
          {mapIndexed(
            (x, index) => (
              <span>
                {index > 0 ? ", " : ""}
                {x.name}
              </span>
            ),
            toJson(item.categories)
          )}
        </td>
      ),
      revisions: (
        <td
          onClick="showDialogAllRevisions(props.item.id)"
          class="text-xs-center"
        >
          <v-chip>oneRevision(revisions)</v-chip>
          {revisions.length > 1 ? (
            <span class="grey--text caption">
              (+{revisions.length - 1} dalších)
            </span>
          ) : (
            ""
          )}
        </td>
      ),
      count: (
        <td class="text-xs-center">
          <v-chip>{toolItemsCount(props.item.items)}</v-chip>
        </td>
      ),
      files: (
        <td class="text-xs-center">
          <v-btn round color="primary" dark onClick="showFiles(props.item.id)">
            hasFiles(props.item.files)
            <v-icon>image_search</v-icon>
          </v-btn>
        </td>
      ),
      actions: (
        <td class="justify-center layout px-0">
          {map(action => actions[action], visibleActions)}
        </td>
      )
    };

    return map(({ value }) => columns[value] || <td />, visibleColumns);
  }
};
