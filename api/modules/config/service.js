"use strict";

var sql = require("./sql");

module.exports.list = query => {
  return sql.list(query);
};

module.exports.editByName = data => {
  return sql.editByName(data);
};

