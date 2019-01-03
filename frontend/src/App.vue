<template>
  <v-app id="inspire">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <router-link tag="v-list-tile" v-for="(child, i) in item.children" :to="child.path" :key="i">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </router-link>
          </v-list-group>
          <router-link tag="v-list-tile" v-else :key="item.text" :to="item.path">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </router-link>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">MTeZ s.r.o. INTRANET</span>
      </v-toolbar-title>
      <v-autocomplete @change="changeAutocomplete" :items="autocomplete.items" v-model="autocomplete.select" cache-items flat hide-details label="Search" solo-inverted class="hidden-sm-and-down"></v-autocomplete>
      <v-spacer></v-spacer>
      <!--
      <stock-toolbar-button/>
      -->
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <component v-bind:is="mainModal" :myData=mainModalData></component>
    <render-component :component="getComponent" />
  </v-app>
</template>

<script>
import { propEq, find, prop } from "ramda";
import RenderComponent from "./components/RenderComponent";
export default {
  components: {
    "render-component": RenderComponent
  },
  data: () => ({
    dialog: false,
    drawer: false,
    items: [
      { icon: "build", text: "Nástroje", path: "/fe/tools" },
      { icon: "category", text: "Kategorie", path: "/fe/tools/categories" },
      { icon: "people", text: "Zaměstnanci", path: "/fe/users" },
      { icon: "store", text: "Sklady", path: "/fe/warehouse" },
      {
        icon: "schedule",
        text: "Typy revizí",
        path: "/fe/tools/revision-type"
      },
      {
        icon: "update",
        text: "Blížící se revize",
        path: "/fe/tools/revision-upcoming"
      },
      { icon: "store", text: "Historie skladu", path: "/fe/move-history" },
      { icon: "date_range", text: "Úkoly", path: "/fe/task" }
      // {
      //   icon: "keyboard_arrow_up",
      //   "icon-alt": "keyboard_arrow_down",
      //   text: "Labels",
      //   model: true,
      //   children: [{ icon: "add", text: "Create label", path: "" }]
      // }
    ],
    autocomplete: {
      search: null,
      items: [
        { text: "Nástroje", path: "/fe/tools" },
        { text: "Kategorie", path: "/fe/tools/categories" },
        { text: "Typy revizí", path: "/fe/tools/revision-type" },
        { text: "Blížící se revize", path: "/fe/tools/revision-upcoming" },
        { text: "Historie skladu", path: "/fe/move-history" }
      ],
      selected: []
    }
  }),
  computed: {
    mainModal() {
      return this.$store.state.mainModal;
    },
    getComponent() {
      return this.$store.state.component;
    },
    mainModalData() {
      return this.$store.state.mainModal
        ? this.$store.state.mainModal.myData
        : null;
    }
  },
  created() {
    if (!localStorage.basicToken) {
      const password = prompt("Zadejte heslo");
      console.log(password);
      this.axios
        .post("/login", {
          password
        })
        .then(response => {
          if (response.data.basicToken) {
            localStorage.basicToken = response.data.basicToken;
          }
        });
    }
  },
  props: {
    source: String
  },
  methods: {
    changeAutocomplete(val) {
      const item = find(propEq("text", val), this.autocomplete.items);
      this.$router.push(prop("path", item));
    }
  }
};
</script>
