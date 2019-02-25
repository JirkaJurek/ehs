<template>
  <div>
    <v-layout my-3 display-2 align-center justify-center>Přehled úkolů</v-layout>
    <v-card class="mx-3">
      <v-card-text>
        <task-table>
          <template slot="filters" slot-scope="slotProps">
            <filters-for-task-table v-bind="slotProps" />
          </template>
        </task-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TaskTable from "../components/TaskTable";
import FiltersForTaskTable from "../components/FiltersForTaskTable";
export default {
  components: {
    "task-table": TaskTable,
    "filters-for-task-table": FiltersForTaskTable
  }
};
</script>
