"use strict";

var sql = require("./sql");

module.exports.list = query => {
  return sql.list(query);
};

