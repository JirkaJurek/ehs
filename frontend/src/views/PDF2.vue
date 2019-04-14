<template>
  <div>
   
    <div v-html="html"></div>

     
  </div>
</template>

<script>
/*
<vue-friendly-iframe
      width="100%"
      :src="'http://localhost:3031/files/pdf.1.html'"
    />
    */
import VueFriendlyIframe from "vue-friendly-iframe";
export default {
  components: {
    "vue-friendly-iframe": VueFriendlyIframe
  },
  data: () => ({
    html: ""
  }),
  created() {
    console.log(this.components)
    this.axios.get("http://localhost:3031/files/pdf.1.html?items=[]").then(response => {
      console.log(response);
      this.html = response.data;
    });
  }
};
</script>