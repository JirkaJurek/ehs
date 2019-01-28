<template>
  <task-table>
    <template slot="filters" slot-scope="slotProps">
      <filters-for-task-table v-bind="slotProps" />
    </template>
  </task-table>
</template>

<script>
import TaskTable from "../components/TaskTable";
import FiltersForTaskTable from "../components/FiltersForTaskTable";
export default {
  components: {
    "task-table": TaskTable,
    "filters-for-task-table": FiltersForTaskTable,
  }
};
</script>
