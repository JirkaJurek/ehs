<template>
  <div>
    <v-btn @click.native="editItem()" color="primary" dark class="mb-2">Nový typ revize</v-btn>
    <v-data-table :headers="headers" :items="items" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ toJson(props.item.revisionInterval).text }}</td>
        <td>{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small class="mr-2" @click="detail(props.item.id)">visibility</v-icon>
          <v-icon small @click="deleteItem(props.item.id)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <dialog-tool-revision-type ref="dtrt"></dialog-tool-revision-type>
  </div>
</template>

<script>
export default {
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
  methods: {
    editItem(item) {
      this.$refs.dtrt.open(item);
    },
    detail(itemId) {
      this.$router.push(`/fe/tools/revision-type/${itemId}`);
    },
    deleteItem(itemId) {
      this.axios.delete(`/tools/revision-type/${itemId}`).then(response => {
        this.$store.dispatch("inicialize", ["loadAllRevisionType"]);
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