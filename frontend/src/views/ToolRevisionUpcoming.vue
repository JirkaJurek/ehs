<template>
  <div>
    <v-btn :disabled="bulk" @click.native="showDialogNewRevisions(0)" color="primary" class="mb-2">Nová revize</v-btn>
    <v-data-table :headers="headers" :items="items" hide-actions v-model="selected" select-all class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
        </td>
        <td>{{ props.item.name }}</td>
        <td>{{ getNextRevision(props.item.revisionType, props.item.date) }}</td>
        <td>{{ toJson(props.item.revisionType).name }}</td>
      </template>
    </v-data-table>
    <revision-tool ref=revisionTool />

  </div>
</template>

<script>
import { find, pipe, propEq, prop, map, split } from "ramda";
import moment from "moment";
export default {
  data() {
    return {
      headers: [
        {
          text: "Název revize",
          value: "name"
        },
        { text: "Následující datum revize", value: "revisionInterval" },
        { text: "Typ revize", value: "revisionType" }
      ],
      items: [],
      selected: [],
      bulk: true
    };
  },
  created() {
    this.axios.get("/tools/revision-type/upcoming").then(response => {
      this.items = response.data;
    });
  },
  computed: {},
  watch: {
    selected(val) {
      this.bulk = val.length ? false : true;
    }
  },
  methods: {
    test(s) {
      console.log(s);
    },
    getNextRevision(revision, date) {
      if (revision) {
        const [c, y] = pipe(
          this.toJson,
          prop("revisionInterval"),
          this.toJson,
          prop("value"),
          split(" ")
        )(revision);
        return moment(date)
          .add(c, y)
          .format("D. M. YYYY");
      }
      return "";
    },
    showDialogNewRevisions(itemId) {
      // TODO: chtělo by to automaticky předvybrat daný typ revize
      this.$refs.revisionTool.selected = this.selected;
      this.$refs.revisionTool.showDialogNewRevisions(itemId);
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