"use strict";

const sql = require("./sql");

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

module.exports.add = (data) => {
  return sql.add(data);
};

module.exports.update = (id, data) => {
  return sql.update(id, data);
};

module.exports.showById = id => {
  return sql.showById(id);
};

module.exports.list = async (query) => {
  return sql.list(query);
};

module.exports.delete = id => {
  return sql.deleteById(id);
};