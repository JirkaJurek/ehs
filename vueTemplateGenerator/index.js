import fs from "fs";
import basic from "./templates/basic";

// console.log(basic)

fs.writeFile("vueTemplates/test.vue", basic({}), function(err) {
  if (err) throw err;
  console.log("Saved!");
});
fs.writeFile("vueTemplates/mynewfile3.vue", "Hello content!", function(err) {
  if (err) throw err;
  console.log("Saved!");
});
