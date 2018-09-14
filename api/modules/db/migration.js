'use strict'

const { db } = require('./index');
const fs = require('fs');

async function fileToPromise(file) {
    let string = '';
 
    file.on('data', (chunk) => {
         string += chunk.toString();
     });
 
     return new Promise(function (resolve, reject) {
         file.on('end', () => resolve(string));
         file.on('error', reject);
     });
 }

fs.readdirSync(__dirname + '/migrations/').forEach(file => {
    
    fs.readFile(__dirname + '/migrations/' + file, function (err, openFile) {
        if (err) throw err;
        
        console.log(fileToPromise(openFile));
      });
})
fs.appendFile(__dirname + '/migration', 'This is my text.', function (err) {
    if (err) throw err;
  });