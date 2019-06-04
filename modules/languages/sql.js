"use strict";

const { execQuery, queryBuilder } = require("../db");
const tableName = "lang";

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

const transformData = data => {
  return data;
};

async function add(data) {}

function update(id, data) {}

function list(query) {
  const builder = new queryBuilder();
  const filter = query.filter ? JSON.parse(query.filter) : {};
  builder.from(tableName);
  builder.where(`${tableName}.active = true`);
  builder.orderBy(`${tableName}.id`, "true");
  return execQuery(builder.getSql());
}

function showById(id) {
  return execQuery(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
}

function deleteById(toolId) {
  return execQuery(`UPDATE ${tableName} SET active=false WHERE id = $1;`, [
    toolId
  ]);
}

module.exports = {
  add,
  update,
  list,
  showById,
  deleteById
};
