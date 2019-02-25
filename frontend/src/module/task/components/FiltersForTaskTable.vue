<template>
  <v-layout row justify-center>
    <v-flex xs12 sm3 :class="[$style.search]" px-1>
      <v-text-field @keyup="searchChangeInner" append-icon="search" label="Vyhledávání" single-line hide-details />
    </v-flex>
    <v-flex xs12 sm2 px-2>
      <employee-select v-on:change="resolverChangeInner" :return-object="false" label="Řešitel" :value="[currentUserId]" />
    </v-flex>
    <v-flex xs12 sm2 px-2>
      <employee-select v-on:change="submitterChangeInner" :return-object="false" label="Zadavatel" />
    </v-flex>
    <v-flex xs12 sm2 px-1>
      <type-select v-on:change="typeChangeInner" :return-object="false" />
    </v-flex>
    <v-flex xs12 sm2 px-1>
      <status-select v-on:change="statusChangeInner" :return-object="false" />
    </v-flex>
    <!--
    <v-flex xs12 sm4 mx-1>
      <date-range-picker v-on:change="dateChangeInner" />
    </v-flex>
    -->
  </v-layout>
</template>

<style module>
.search {
  margin-bottom: 20px;
}
</style>

<script>
import Employee from "../../tool/EmployeeSelect";
import { TypeSelect, StatusSelect } from ".";
export default {
  components: {
    "employee-select": Employee,
    "type-select": TypeSelect,
    "status-select": StatusSelect
  },
  props: {
    filterChange: Function,
    searchChange: Function
  },
  data: () => ({
    filter: {
      submitter: [],
      resolver: [],
      type: [],
      status: [],
      date: []
    }
  }),
  computed: {
    currentUserId() {
      return this.$store.getters.getCurrentUser().user.id;
    }
  },
  watch: {
    filter: {
      handler(actualData) {
        this.filterChange({
          ...actualData
        });
      },
      deep: true
    }
  },
  created() {
    this.filter.resolver = [this.$store.getters.getCurrentUser().user.id];
  },
  methods: {
    searchChangeInner(value) {
      // chtělo by to alespoň 300ms pauzu mezi stisky kláves
      this.searchChange(value.target.value);
    },
    submitterChangeInner(values) {
      this.filter.submitter = values;
    },
    resolverChangeInner(values) {
      this.filter.resolver = values;
    },
    typeChangeInner(values) {
      this.filter.type = values;
    },
    statusChangeInner(values) {
      this.filter.status = values;
    },
    dateChangeInner(values) {
      this.filter.date = values;
    }
  }
};
</script>