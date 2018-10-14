const { tools } = require("../index");
const { map, assoc, filter, isEmpty, not } = require("ramda");

const csvToArray = require("csv-to-array");
module.exports.migration = () => {
  const columns = [
    "test",
    "supplier",
    "name",
    "test",
    "machineNumber",
    "revisionCard",
    "yearOfManufacture",
    "seriesNumber"
  ];

  csvToArray(
    {
      file:
        "/Users/michal/Documents/plan_revize/Plán\ budova\,\ auta\,\ EZS-Tabulka\ 1.csv",
      columns,
      csvOptions: {
        delimiter: ";"
      }
    },
    function(err, array) {
      // každý položce přidat kateorii
      console.log(err || array);
      map(item => {
        item.categories = [{ value: 3, text: "Pily" }];
        tools.service.add(
          filter(x => {
            return not(isEmpty(x));
          }, item)
        );
      }, array);
    }
  );
};
