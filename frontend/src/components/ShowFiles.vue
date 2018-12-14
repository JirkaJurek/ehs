<template>
  <v-dialog v-model="isOpenDialog">
    <v-flex xs12>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-carousel v-if="detail" :value="detailValue" hide-delimiters>
              <v-carousel-item v-for="(file,i) in files" :key="i" :src="getPath(file.path)"></v-carousel-item>
            </v-carousel>
            <template v-else>
              <v-flex v-for="(file, key) in files" :key="key" xs3 d-flex>
                <v-card flat tile class="d-flex">
                  <v-img @click="showDetail(key)" :src="`${baseApiPath + file.path}`" :lazy-src="`${baseApiPath + file.path}`" aspect-ratio="1" class="grey lighten-2">
                    <v-toolbar dense floating>
                      <v-text-field hide-details prepend-icon="search" single-line></v-text-field>
                      <v-btn icon>
                        <v-icon>my_location</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </v-img>
                </v-card>
              </v-flex>
            </template>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-dialog>
</template>

<script>
import { slice } from "ramda";
export default {
  name: "ShowFiles",
  props: [],
  data: () => ({
    isOpenDialog: false,
    detail: false,
    detailValue: 0,
    files: []
  }),
  computed: {
    baseApiPath() {
      // return process.env.VUE_APP_SERVER_URL;
      return location.origin;
    }
  },
  created() {},
  watch: {
    isOpenDialog(val) {
      if (!val) {
        this.files = [];
      }
    }
  },
  methods: {
    open(filesArray) {
      this.files = filesArray;
      this.isOpenDialog = true;
    },
    showDetail(val = 0) {
      this.detail = true;
      this.detailValue = val;
    },
    getPath(path) {
      console.log(path);
      console.log(slice(-3,3, path));
      return "https://via.placeholder.com/300x100.png?text=placeholder";
      return this.baseApiPath + path;
    }
  }
};
</script>
