"use strict";

const sql = require("./sql");

module.exports.add = data => {
  return sql.add(data);
};

module.exports.update = (id, data) => {
  return sql.update(id, data);
};

module.exports.showById = id => {
  return sql.showById(id);
};

module.exports.list = query => {
  return sql.list(query);
};

module.exports.delete = id => {
  return sql.deleteById(id);
};