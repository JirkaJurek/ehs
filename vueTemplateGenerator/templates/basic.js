"use strict";

const generateRow = ({ value }) => {
  return `<td class="text-xs-center">{{ item.${value} }}</td>`;
};
const generateHeader = ({ value, text, align = "center", classes }) => {
  return `{
    text: "${text}",
    value: "${value}",
    align: "${align}",
    class: "${classes}"
  }`;
};

module.exports = props => {
  const { title, hasSearch = false, rows = [] } = props;
  return `<template>
  <div>
    <v-card>
      <v-card-title>
        <v-layout
          my-3
          display-2
          align-center
          justify-center
        >${title}</v-layout>
      </v-card-title>
      <v-card-text>
        ${
          hasSearch
            ? `<div
        style="margin-bottom: 16px;"
        xs12
        color="white"
      >
        <div style="float: left;">
          <new-mobile />
        </div>
        <v-flex
          xs12
          sm4
        >
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Vyhledávání"
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
      </div>`
            : ""
        }
        
        <v-data-table
        ${hasSearch ? ":search=search" : ""}
          :headers="headers"
          :items="mobileTariffs"
          class="elevation-3"
          item-key="id"
          hide-actions
        >
          <template
            slot="items"
            slot-scope="{item}"
          >
            <tr>
              ${rows.map(generateRow)}
              <td class="justify-center layout px-0">
                <edit-mobile :id="item.id" />
                <delete-mobile :id="item.id" />
              </td>
            </tr>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >
            Nebyl nalezen žádný výsledek pro výraz "{{ search }}".
          </v-alert>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { DeleteButton, NewButton, EditButton } from "../components";
export default {
  components: {
    "new-mobile": NewButton,
    "edit-mobile": EditButton,
    "delete-mobile": DeleteButton
  },
  data: () => ({
    search: "",
    headers: [
      ${rows.map(generateHeader)}
    ]
  }),
  computed: {
    mobileTariffs() {
      return this.$store.state.addressBook.mobileTariffs;
    }
  },
  created() {
    this.$store.dispatch("loadAllMobileTariffs");
  },
  watch: {},
  methods: {}
};
</script>
`;
};
