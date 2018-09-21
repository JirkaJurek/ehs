<template>
  <div>
    <ul>
      <li v-for="(file, key) in files" v-bind:key="key">
        <img :src="file.blob" width="50" height="50" />
        {{file.name}} - Error: {{file.error}}, Success: {{file.success}}</li>
    </ul>
    <file-upload :multiple="true" ref="upload" v-model="files" @input-file="inputFile" @input-filter="inputFilter">
      Upload file
    </file-upload>
  </div>

</template>

<script>
// tohle bude fungovat tak že vyjede modál, 
// v něm se bude vybírat z již nahraných obrázku(dokumentu), ale bude se přez něj dát i nahrát obrázek nový
// !!! celkově v celém projektu se takto budou nahrávat obrázky
// pozor při mazání obrázku se bude muset vědět kde všude jsou a co všechno se tím postihne

export default {
  name: "UploadFile",
  data: () => ({
    files: []
  }),
  methods: {
    inputFile: function(newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log("response", newFile.response);
        if (newFile.xhr) {
          //  Get the response status code
          console.log("status", newFile.xhr.status);
        }
      }
    },
    inputFilter: function(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent();
        }
      }
      // Create a blob field
      newFile.blob = "";
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file);
      }
    }
  }
};
</script>
