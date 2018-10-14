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

  const files = [
    "/Users/michal/Documents/plan_revize/vstroje.csv",
    "/Users/michal/Documents/plan_revize/budova.csv",
    "/Users/michal/Documents/plan_revize/el-naradi.csv",
    "/Users/michal/Documents/plan_revize/hasici.csv",
    "/Users/michal/Documents/plan_revize/jeraby.csv",
    "/Users/michal/Documents/plan_revize/kompresory.csv",
    "/Users/michal/Documents/plan_revize/odsavani.csv",
    "/Users/michal/Documents/plan_revize/prodluzky.csv",
    "/Users/michal/Documents/plan_revize/topeni.csv",
  ];

  const categories = [
    {
      value: 1,
      text: "Velké stroje"
    },
    {
      value: 9,
      text: "Budova, auta, EZS"
    },
    {
      value: 2,
      text: "Elektrické nářadí"
    },
    {
      value: 8,
      text: "Hasící zařízení"
    },
    {
      value: 4,
      text: "Jeřáby, zdvihací zařízení, vozíky"
    },
    {
      value: 7,
      text: "Kompresory, vývěvy, tlak. nádoby"
    },
    {
      value: 3,
      text: "Odsávání, vysavače"
    },
    {
      value: 5,
      text: "Prodlužovací kabely"
    },
    {
      value: 6,
      text: "Topení, plyn"
    }
  ];

  const current = 8

  csvToArray(
    {
      file: files[current],
      columns,
      csvOptions: {
        delimiter: ";"
      }
    },
    function(err, array) {
      // každý položce přidat kateorii
      // console.log(err || array);
      map(item => {
        item.categories = [categories[current]];
        tools.service.add(
          filter(x => {
            return not(isEmpty(x));
          }, item)
        );
      }, array);
    }
  );
};
