/*
var columns = ["column1", "column2", "column3"];
require("csv-to-array")({
   file: "path/to/input/file.csv",
   columns: columns
}, function (err, array) {
  console.log(err || array);
});
*/

const csvToArray = require("csv-to-array");
module.exports.migration = () => {
  const columns = ['test', 'col'];

  csvToArray(
    {
      file: "/Users/michal/www/js/intranet/api/modules/migrationFromCSV/test.csv",
      columns,
      csvOptions: {
        delimiter: ';'
      }
    },
    function(err, array) {
      console.log(err || array);
    }
  );
};
