<template>
  <div>
    <new-revision-type />
    <v-data-table :headers="headers" :items="items" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ toJson(props.item.revisionInterval).text }}</td>
        <td>{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <edit-revision-type :defaultItem="props.item" />
          <detail-revision-type :id="props.item.id" />
          <delete-revision-type :id="props.item.id" />
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { NewButton, EditButton, DeleteButton, DetailButton } from "../module/revision/components";
export default {
  components: {
    "new-revision-type": NewButton,
    "edit-revision-type": EditButton,
    "delete-revision-type": DeleteButton,
    "detail-revision-type": DetailButton,
  },
  data() {
    return {
      headers: [
        {
          text: "Název revize",
          value: "name"
        },
        { text: "Interval opakování", value: "revisionInterval" },
        { text: "Popis", value: "description" },
        { text: "Akce", value: "action", align: "center" }
      ]
    };
  },
  created() {
    this.$store.dispatch("inicialize", ["loadAllRevisionType"]);
  },
  computed: {
    items() {
      return this.$store.state.tool.revisionType;
    }
  },
  watch: {},
  methods: {}
};
</script>