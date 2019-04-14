"use strict";

const { execQuery, queryBuilder } = require("../db");
const tableName = "file";

function add(data) {
  const tool = execQuery(
    `INSERT INTO ${tableName} (name, path, absolutePath, size, mimetype) VALUES (:name, :path , :absolutePath, :size, :mimetype);`,
    data
  );
  return tool;
}

function showById(id) {
  return execQuery(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
}

function list(query) {
  const builder = new queryBuilder();
  builder.from(tableName);
  builder.orderBy("id", "true");
  return execQuery(builder.getSql());
}

module.exports = {
  add,
  list,
  showById,
};
