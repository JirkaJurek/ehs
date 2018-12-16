<template>
  <v-toolbar flat color="white">
    <v-flex xs12 sm4 :class="[$style.search]" mx-1>
      <v-text-field @keyup="searchChangeInner" append-icon="search" label="Vyhledávání" single-line hide-details />
    </v-flex>
    <v-flex xs12 sm4 mx-2>
      <employee-select v-on:change="employeeChangeInner" />
    </v-flex>
    <v-flex xs12 sm4 mx-2>
      <warehouse-select v-on:change="warehouseChangeInner" />
    </v-flex>
    <v-flex xs12 sm4 mx-1>
      <category-select v-on:change="categoryChangeInner" />
    </v-flex>
  </v-toolbar>
</template>

<style module>
.search {
  margin-bottom: 20px;
}
</style>

<script>
import Employee from "./EmployeeSelect";
import Category from "./CategorySelect";
import WarehouseSelect from "./WarehouseSelect";
export default {
  components: {
    'employee-select': Employee,
    'category-select': Category,
    'warehouse-select': WarehouseSelect,
  },
  props: {
    searchChange: Function,
    employeeChange: Function,
    categoryChange: Function,
    warehouseChange: Function,
  },
  data: () => ({}),
  computed: {},
  watch: {},
  created() {
  },
  methods: {
    searchChangeInner(value) {
      // chtělo by to alespoň 300ms pauzu mezi stisky kláves
      return this.searchChange ? this.searchChange(value.target.value) : this.$emit("searchChange", value.target.value);
    },
    employeeChangeInner(values) {
      return this.employeeChange ? this.employeeChange(values) : this.$emit("employeeChange", values);
    },
    warehouseChangeInner(values) {
      return this.warehouseChange ? this.warehouseChange(values) : this.$emit("warehouseChange", values);
    },
    categoryChangeInner(values) {
      return this.categoryChange ? this.categoryChange(values) : this.$emit("categoryChange", values);
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