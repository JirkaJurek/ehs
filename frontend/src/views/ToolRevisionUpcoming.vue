<template>
  <div>
    <v-layout row>
      <v-btn :disabled="bulk" @click.native="showDialogNewRevisions(0)" color="primary" class="mb-2">Nová revize</v-btn>
      <v-flex xs6 sm4 md3 mx-2>
        <revision-types-select @change="changeRevisionTypes" />
      </v-flex>
      <v-flex xs2 sm2 md1 mx-2>
        <v-text-field @change="changeDaysBack" :value="filter.daysBack" type="number" label="Počet dní zpět" />
      </v-flex>

    </v-layout>
    <v-data-table :headers="headers" :items="items" hide-actions v-model="selected" select-all class="elevation-1">
      <template slot="items" slot-scope="props">
        <tr :style="{backgroundColor: getDateClass(props.item.nextRevision)}">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>{{ getToolName(props.item.id_tool) }}</td>
          <td>{{ toJson(props.item.revisionType).name }}</td>
          <td>{{ props.item.nextRevision | dateFormat }}</td>
        </tr>
      </template>
    </v-data-table>
    <revision-tool ref=revisionTool />

  </div>
</template>

<script>
import { always, cond, lt, map, prop, T } from "ramda";
import { differenceInDays } from "date-fns";
import RevisionTypesSelect from "../module/tool/RevisionTypesSelect";
export default {
  components: {
    "revision-types-select": RevisionTypesSelect
  },
  data() {
    return {
      headers: [
        { text: "Název nástroje", value: "name" },
        { text: "Typ revize", value: "revisionType" },
        { text: "Následující datum revize", value: "nextRevision" }
      ],
      filter: {
        revisionTypes: [],
        daysBack: 50
      },
      items: [],
      selected: [],
      bulk: true
    };
  },
  created() {
    this.initialize();
  },
  computed: {},
  watch: {
    filter: {
      handler() {
        this.initialize();
      },
      deep: true
    },
    selected(val) {
      this.bulk = val.length ? false : true;
    }
  },
  methods: {
    changeRevisionTypes(val) {
      this.filter.revisionTypes = map(prop("id"), val);
    },
    changeDaysBack(val) {
      this.filter.daysBack = val;
    },
    initialize() {
      this.axios
        .get("/tools/revision-type/upcoming", {
          params: {
            filter: this.filter
          }
        })
        .then(response => {
          this.items = response.data;
        });
    },
    getToolName(toolId) {
      if (this.$store.state.tool.tools.length === 0) {
        this.$store.dispatch("loadAllTool");
      }
      return this.$store.getters.getToolNameById(toolId);
    },
    test(s) {
      console.log(s);
    },
    showDialogNewRevisions(itemId) {
      // TODO: chtělo by to automaticky předvybrat daný typ revize
      this.$refs.revisionTool.selected = map(
        x => ({
          id: x["id_tool"]
        }),
        this.selected
      );
      this.$refs.revisionTool.showDialogNewRevisions(itemId);
    },
    getDateClass(date) {
      return cond([
        [lt(25), always("#C5E1A5")],
        [lt(10), always("#E6EE9C")],
        [T, always("#E57373")]
      ])(differenceInDays(date, new Date()));
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