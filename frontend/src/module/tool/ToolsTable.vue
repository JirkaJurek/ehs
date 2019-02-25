<template>
  <div>
    <v-toolbar flat color="white" class="filter">
      <slot name="filters" :categoryChange="categoryChange" :searchChange="searchChange" :employeeChange="employeeChange" :warehouseChange="warehouseChange"></slot>
    </v-toolbar>
    <v-data-table id="toolTable" :search=search :custom-sort="customSort" :headers="headers" :items="tools" class="elevation-3" v-model="selected" item-key="id" select-all :rows-per-page-items="rowsItem">
      <template slot="items" slot-scope="props">
        <tr>
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <ToolsTableColumns :visibleColumns="headers" :item="props.item" :visibleActions="visibleActions" />
        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Nebyl nalezen žádný výsledek pro výraz "{{ search }}".
      </v-alert>
    </v-data-table>
  </div>
</template>

<style>
#toolTable {
  margin-top: 4px;
}
#toolTable .whiteSpace {
  white-space: inherit;
}
#toolTable .wider {
  min-width: 300px;
}
#toolTable table td {
  padding: 0 12px;
}
#toolTable table th {
  padding: 0 12px;
}
#toolTable tr:nth-child(even) {
  background-color: #fafafa;
}
</style>

<script>
import { lensProp, map, set, prop } from "ramda";
import ToolsTableColumns from "./ToolsTableColumns";
export default {
  components: {
    ToolsTableColumns: ToolsTableColumns
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    search: "",
    textFontSizeClass: "test-size-1",
    filter: {
      employee: [],
      categories: [],
      warehouse: []
    },
    // měl by jít i k rodiči a potomkum, možnost i při každe změně
    selected: [],
    pagination: {},
    rowsItem: [25, 50, 100, { text: "vše", value: -1 }]
  }),

  computed: {
    tools() {
      return this.$store.state.tool.tools;
    },
    // přednost by měli mít asi actions z prop před tímto
    visibleActions() {
      return this.filter.deletedAt ? ["revert"] : ["edit", "clone", "delete"];
    }
  },

  watch: {
    // měl by jít i k rodiči a potomkum, možnost i při každe změně
    selected(val) {
      this.$emit("selectedItems", val);
    }
  },

  created() {
    this.initialize();
    this.$store.dispatch("inicialize");
  },

  methods: {
    categoryChange(values) {
      this.filter.categories = map(prop("id"), values);
      this.initialize();
    },
    employeeChange(values) {
      this.filter.employee = map(prop("id"), values);
      this.initialize();
    },
    warehouseChange(values) {
      this.filter.warehouse = map(prop("id"), values);
      this.initialize();
    },
    searchChange(values) {
      this.search = values;
    },
    customSort(items, sortBy, descending) {
      if (
        this.pagination.sortBy != sortBy ||
        this.pagination.descending != descending
      ) {
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;
        this.initialize();
      }
      return items;
    },
    initialize() {
      this.$store.dispatch("loadAllTool", {
        filter: this.filter,
        sortBy: this.pagination.sortBy,
        descending: this.pagination.descending
      });
    },
    toJson(data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
  }
};
</script>