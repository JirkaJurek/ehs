<template>
  <v-toolbar flat color="white">
    <v-flex xs12 sm4 :class="[$style.search]" mx-1>
      <v-text-field @keyup="searchChangeInner" append-icon="search" label="Vyhledávání" single-line hide-details />
    </v-flex>
    <v-flex xs12 sm4 mx-2>
      <employee-select v-on:change="resolverChangeInner" :return-object="false" label="Řešitel" :value="[currentUserId]" />
    </v-flex>
    <v-flex xs12 sm4 mx-2>
      <employee-select v-on:change="submitterChangeInner" :return-object="false" label="Zadavatel" />
    </v-flex>
    <v-flex xs12 sm4 mx-1>
      <type-select v-on:change="typeChangeInner" :return-object="false" />
    </v-flex>
    <!--
    <v-flex xs12 sm4 mx-1>
      <date-range-picker v-on:change="dateChangeInner" />
    </v-flex>
    -->
  </v-toolbar>
</template>

<style module>
.search {
  margin-bottom: 20px;
}
</style>

<script>
import Employee from "../../tool/EmployeeSelect";
import Type from "./TypeSelect";
export default {
  components: {
    "employee-select": Employee,
    "type-select": Type
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
    dateChangeInner(values) {
      this.filter.date = values;
    }
  }
};
</script>