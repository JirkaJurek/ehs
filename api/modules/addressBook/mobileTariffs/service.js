"use strict";

const sql = require("./sql");

const add = data => {
  return sql.add(data);
};

const update = (id, data) => {
  return sql.update(id, data);
};

const showById = (id, withSecretData) => {
  return sql.showById(id, withSecretData);
};

const list = (query, withSecretData) => {
  return sql.list(query, withSecretData);
};

const deleteMobile = id => {
  return sql.deleteById(id);
};

module.exports = {
  add,
  update,
  showById,
  list,
  delete: deleteMobile
};
