<template>
  <v-dialog v-model="isOpenDialog">
    <v-btn slot="activator" color="red lighten-2" dark>
      Nahrát soubory
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Nahrávání obrázku</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-btn @click="save">
            Uložit vybrané soubory
          </v-btn>
          <ul>
            <li v-for="(file, key) in files" v-bind:key="key">
              <v-checkbox multiple v-model="selected" :value="file" />
              <img :src="baseApiPath + file.path" width="50" height="50" /> {{file.name}}</li>
          </ul>
          <input type="file" multiple @change="onFileChange">
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
// tohle bude fungovat tak že vyjede modál,
// v něm se bude vybírat z již nahraných obrázku(dokumentu), ale bude se přez něj dát i nahrát obrázek nový
// !!! celkově v celém projektu se takto budou nahrávat obrázky
// pozor při mazání obrázku se bude muset vědět kde všude jsou a co všechno se tím postihne

export default {
  name: "UploadFile",
  props:['selectedFiles'],
  data: () => ({
    isOpenDialog: false,
    selected: []
  }),
  computed: {
    baseApiPath() {
      return process.env.VUE_APP_SERVER_URL;
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
        this.selected = this.selectedFiles || []
        this.$store.dispatch("loadFiles");
      } 
        
    }
  },
  methods: {
    open() {
      this.isOpenDialog = true;
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
      this.$emit('update', this.selected)
      this.isOpenDialog = false;
    }
  }
};
</script>
