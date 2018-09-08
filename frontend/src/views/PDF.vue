<template>
  <div>
    
  </div>
</template>

<script>
const PDFDocument = require('pdfkit')
const blob = require('blob-stream')
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());
console.log(doc)

</script>