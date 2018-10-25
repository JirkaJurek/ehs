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
      id: 1,
      name: "Velké stroje"
    },
    {
      id: 9,
      name: "Budova, auta, EZS"
    },
    {
      id: 2,
      name: "Elektrické nářadí"
    },
    {
      id: 8,
      name: "Hasící zařízení"
    },
    {
      id: 4,
      name: "Jeřáby, zdvihací zařízení, vozíky"
    },
    {
      id: 7,
      name: "Kompresory, vývěvy, tlak. nádoby"
    },
    {
      id: 3,
      name: "Odsávání, vysavače"
    },
    {
      id: 5,
      name: "Prodlužovací kabely"
    },
    {
      id: 6,
      name: "Topení, plyn"
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
