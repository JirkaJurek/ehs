import { add, map, reduce } from "ramda";
import { visibleColumns } from "../base/visibleSortedTable";

export default {
  functional: true,
  props: {
    visibleColumns: {
      type: Function
    },
    item: {
      type: Object
    },
    visibleActions: {
      type: Array
    },
    selected: {
      type: Array
    }
  },
  test: "",
  render(createElement, { props }) {
    const action = data => console.log(data);
    return props.visibleColumns(createElement, props.item, action);
    // return (
    //   <tr>
    //     <td>
    //       <v-checkbox v-model={props.selected} primary hide-details />
    //     </td>
    //     {props.visibleColumns(createElement, props.item, action)}
    //   </tr>
    // );
  }
};

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

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

export const ahoj = visibleColumnsArray => {
  console.log('ahoj2')
  const extraColumns = {
    count: (h, item) => (
      <td class="text-xs-center">
        <v-chip>{toolItemsCount(item.items)}</v-chip>
      </td>
    )
  };
  const visibleColumnsFunction = map(
    visibleColumns(extraColumns),
    visibleColumnsArray
  );
  return (h, item, action) => {
    console.log('ahoj')
    return visibleColumnsFunction.map(i => i(h, item, action));
  };
};
