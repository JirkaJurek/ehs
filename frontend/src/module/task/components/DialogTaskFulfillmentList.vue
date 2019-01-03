<template>
  <v-dialog :value="true" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Podrobnosti plnění</span>
      </v-card-title>
      <v-card-text>
        <v-data-table disable-initial-sort :headers="headers" :items="taskFulfillment" class="elevation-1" item-key="id" hide-actions>
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center">{{ props.item.description }}</td>
              <td class="text-xs-center">{{ toJson(props.item.user) | employeeName }}</td>
              <td class="text-xs-center">{{ props.item.done }}</td>
              <td class="text-xs-center">{{ props.item.createdAt | dateFormat }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Zavřít</v-btn>
        <new-button-fulfillment :task="task" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import NewFulfillmentButton from "./NewFulfillmentButton";
export default {
  components: {
    "new-button-fulfillment": NewFulfillmentButton
  },
  props: ["task"],
  data: () => ({
    taskFulfillment: [],
    headers: [
      { text: "Popisek", value: "description", align: "center" },
      { text: "Zapisovatel", value: "user", align: "center" },
      { text: "Splněno", value: "done", align: "center" },
      { text: "Vytvořeno", value: "createdAt", align: "center" }
    ]
  }),
  computed: {},
  created() {
    this.taskFulfillment = this.toJson(this.task.taskFulfillment);
  },
  methods: {
    close() {
      this.$store.commit("setComponent", null);
    },
    save() {
      let url = "/task";
      if (this.id > 0) {
        url += "/" + this.id;
      }
      this.axios.post(url, this.editedItem).then(() => {
        this.$store.dispatch("loadAllTasks", true);
      });
      this.close();
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
