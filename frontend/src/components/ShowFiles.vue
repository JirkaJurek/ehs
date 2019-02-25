<template>
  <v-dialog v-model="isOpenDialog">
    <v-flex xs12>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-carousel v-if="detail" :value="detailValue" hide-delimiters>
              <v-carousel-item v-for="(file,i) in files" :key="i" :src="getPath(file, '1500x500')">
                <v-btn icon @click="detail = false;">
                  <v-icon large>close</v-icon>
                </v-btn>
                <v-btn icon @click.stop="download(file)">
                  <v-icon large color="white">get_app</v-icon>
                </v-btn>
              </v-carousel-item>
            </v-carousel>
            <template v-else>
              <v-flex v-for="(file, key) in files" :key="key" xs3 d-flex>
                <v-card flat tile class="d-flex">
                  <v-img @click="showDetail(key, file)" :src="getPath(file)" :lazy-src="getPath(file)" aspect-ratio="1" class="grey lighten-2">
                    <v-btn icon>
                      <v-icon large color="white">search</v-icon>
                    </v-btn>
                    <v-btn icon @click.stop="download(file)">
                      <v-icon large color="white">get_app</v-icon>
                    </v-btn>
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                    <v-layout subheading ma-3 style="position:absolute; bottom: 0;">{{file.name}}</v-layout>
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
import saveAs from "file-saver";
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
      return process.env.VUE_APP_SERVER_URL;
      // return location.origin;
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
    download(file) {
      saveAs(this.baseApiPath + file.path, file.name);
    },
    open(filesArray) {
      this.files = filesArray;
      this.isOpenDialog = true;
    },
    showDetail(val = 0, file) {
      if (
        file &&
        ["jpg", "peg", "png", "gif"].indexOf(
          file.path.substr(-3).toLowerCase()
        ) === -1
      ) {
        window.open(this.baseApiPath + file.path, "_blank");
      } else {
        this.detail = true;
        this.detailValue = val;
      }
    },
    getPath(file, size = "300x300") {
      if (
        ["jpg", "peg", "png", "gif"].indexOf(
          file.path.substr(-3).toLowerCase()
        ) !== -1
      ) {
        return this.baseApiPath + file.path;
      }
      return `https://via.placeholder.com/${size}.png?text=${file.name}`;
    }
  }
};
</script>
