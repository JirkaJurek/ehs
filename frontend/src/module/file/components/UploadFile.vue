<template>
  <v-dialog v-model="isOpenDialog">
    <v-btn slot="activator" color="blue-grey" dark>
      Nahrát soubory
      <v-icon right dark>cloud_upload</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Nahrávání obrázku</span>
      </v-card-title>
      <v-btn @click="save">
        Uložit vybrané soubory
      </v-btn>
      <v-btn @click="close">
        Zrušit
      </v-btn>
      <input type="file" multiple @change="onFileChange" id="inputFile">
      <label for="inputFile" class="v-btn theme--dark blue-grey">
        Nahrát nové soubory
        <v-icon right dark>cloud_upload</v-icon>
      </label>
      <v-container grid-list-sm fluid id="listImages">
        <v-layout row wrap>
          <v-flex v-for="(file, key) in files" :key="key" xs6 md3 d-flex>
            <v-card flat tile class="d-flex">
              <v-img :src="getPath(file)" style="width: 100%; height: 100%;background-color: grey;">
                <v-expand-transition>
                  <div style="height: 100%; color: white">
                    <v-checkbox multiple v-model="selected" :value="file.id" />
                    <div class="hoverEfect">
                      <div>
                        <v-layout mb-1 mx-2>{{file.name}}</v-layout>
                      </div>
                    </div>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn @click="save">
        Uložit vybrané soubory
      </v-btn>
      <v-btn @click="close">
        Zrušit
      </v-btn>
    </v-card>
  </v-dialog>

</template>

<style>
#inputFile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
#inputFile + label {
  cursor: pointer;
}
#listImages .hoverEfect {
  position: absolute;
  bottom: 0px;
}
#listImages .v-input--selection-controls__input i {
  font-size: 65px;
  color: lightblue;
}
#listImages .v-input--selection-controls__input input {
  height: 60px;
  width: 60px;
}
</style>


<script>
// tohle bude fungovat tak že vyjede modál,
// v něm se bude vybírat z již nahraných obrázku(dokumentu), ale bude se přez něj dát i nahrát obrázek nový
// !!! celkově v celém projektu se takto budou nahrávat obrázky
// pozor při mazání obrázku se bude muset vědět kde všude jsou a co všechno se tím postihne

import { map, find, propEq } from "ramda";
export default {
  name: "UploadFile",
  props: ["selectedFiles"],
  data: () => ({
    isOpenDialog: false,
    selected: []
  }),
  computed: {
    baseApiPath() {
      // return process.env.VUE_APP_SERVER_URL;
      return location.origin;
    },
    files() {
      return this.$store.state.file.files;
    }
  },
  created() {
    this.$store.dispatch("loadFiles");
  },
  watch: {
    isOpenDialog(val) {
      if (val) {
        this.selected = this.selectedFiles || [];
        this.$store.dispatch("loadFiles");
      }
    }
  },
  methods: {
    open() {
      this.isOpenDialog = true;
    },
    close() {
      this.isOpenDialog = false;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      var formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        formData.append("files[]", files.item(i));
      }
      this.axios.post("/files", formData).then(() => {
        setTimeout(() => {
          this.$store.dispatch("loadFiles");
        }, 1000);
      });
    },
    save() {
      this.$emit(
        "update",
        map(id => {
          return find(propEq("id", id), this.files);
        }, this.selected)
      );
      this.close();
    },
    getPath(file, size = "900x300/969696/ffffff") {
      if (["jpg", "peg", "png", "gif"].indexOf(file.path.substr(-3).toLowerCase()) !== -1) {
        return this.baseApiPath + file.path;
      }
      return `https://via.placeholder.com/${size}.png?text=${file.name}`;
    }
  }
};
</script>
