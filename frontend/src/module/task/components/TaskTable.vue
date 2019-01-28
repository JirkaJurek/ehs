<template>
  <div id="TaskTable">
    <new-task />
    <v-toolbar flat color="white" class="filter">
      <slot name="filters" :filterChange="filterChange" :searchChange="searchChange"></slot>
    </v-toolbar>
    <v-data-table :search=search :rows-per-page-items="[25, 50, 100, {text: 'vše', value:-1}]" disable-initial-sort :headers="headers" :items="tasks" class="elevation-1" item-key="id">
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-center">{{ props.item.number }}</td>
          <td class="text-xs-center">{{ props.item.dateOfEntry | dateFormat}}</td>
          <td class="text-xs-center">{{ toJson(props.item.submitter) | employeeName }}</td>
          <td class="text-xs-center">{{ toJson(props.item.resolver) | employeeName }}</td>
          <td class="text-xs-center">{{ props.item.type }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td @click="fulfillment(props.item)" class="text-xs-center">
            <v-chip>{{ toJson(props.item.taskFulfillment).length }}</v-chip>
          </td>
          <td class="text-xs-center">{{ getStatus(props.item) }}</td>
          <td class="text-xs-center">{{ diff(props.item.presumedEnd) }}</td>
          <td class="text-xs-center">{{ props.item.presumedEnd | dateFormat }}</td>
          <td class="text-xs-center">{{ getMet(props.item) }}</td>
          <td class="text-xs-center" v-if="props.item.doneAt">{{ props.item.doneAt | dateFormat}}</td>
          <td class="text-xs-center" v-else></td>
          <td class="justify-center layout px-0">
            <done-task v-if="!props.item.doneAt" :id="props.item.id" />
            <edit-task :id="props.item.id" />
            <delete-task :id="props.item.id" />
          </td>
        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Nebyl nalezen žádný výsledek pro výraz "{{ search }}".
      </v-alert>
    </v-data-table>
  </div>

</template>

<style>
#TaskTable .propName {
  min-width: 800px;
}
#TaskTable .whiteSpace {
  white-space: inherit;
}
</style>

<script>
import { NewButton, DeleteButton, DoneButton, EditButton } from "./index";
import { Vue, Component } from "vue-property-decorator";
import { differenceInDays } from "date-fns";
import taskMixin from "../mixins";
import { head } from "ramda";

@Component({
  components: {
    "new-task": NewButton,
    "delete-task": DeleteButton,
    "done-task": DoneButton,
    "edit-task": EditButton
  },
  mixins: [taskMixin]
})
export default class TaskTable extends Vue {
  search = "";
  headers = [
    { text: "Číslo úkolu", value: "number", align: "center" },
    { text: "Datum zadání", value: "dateOfEntry", align: "center" },
    { text: "Zadavatel", value: "submitter", align: "center" },
    { text: "Řešitel", value: "resolver", align: "center" },
    { text: "Oblast úkolu", value: "type", align: "center" },
    { text: "Název úkolu", value: "name", align: "center", class: "propName" },
    {
      text: "Podrobnosti plnění",
      value: "detail",
      align: "center",
      sortable: false,
      class: "whiteSpace"
    },
    { text: "Stav úkolu", value: "status", align: "center" },
    {
      text: "Zbývající čas do splnění úkolu",
      value: "remainingTime",
      align: "center",
      sortable: false,
      class: "whiteSpace"
    },
    {
      text: "Předpokládaný termín vyřešení",
      value: "presumedEnd",
      align: "center",
      class: "whiteSpace"
    },
    { text: "Plnění v %", value: "met", align: "center" },
    { text: "Termín splnění", value: "doneAt", align: "center" },
    { text: "Akce", value: "doneAt", align: "center", sortable: false }
  ];
  get tasks() {
    return this.$store.state.task.tasks;
  }
  filterChange(filter) {
    this.$store.dispatch("loadAllTasks", {reload: true, getParams: {filter}});
  }
  searchChange(search) {
    this.search = search;
  }
  toJson(data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  diff(date) {
    return differenceInDays(date, new Date());
  }
  created() {
    this.$store.dispatch("loadAllTasks");
  }
  getStatus({ taskFulfillment, doneAt }) {
    if (doneAt) {
      return "Dokončeno";
    } else if (this.toJson(taskFulfillment).length) {
      return "V řešení";
    }
    return "Zadáno";
  }
  getMet({ taskFulfillment }) {
    const fulfillment = this.toJson(taskFulfillment);
    if (fulfillment.length) {
      return `${head(fulfillment).done} %`;
    }
    return "0 %";
  }
  fulfillment(task) {
    this.listFulfillment(task);
  }
}
</script>