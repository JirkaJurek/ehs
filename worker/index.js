'use strict'
const migrationFromCSV = require("../modules/migrationFromCSV");

var program = process.argv[2];
if (program === "migrationFromCSV") {
    migrationFromCSV.migration();
}
