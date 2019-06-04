"use strict";

const { execQuery, queryBuilder } = require("../db");
const tableName = "translation";

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

async function add(data) {
  data = transformData(data);

  const task = execQuery(
    `INSERT INTO ${tableName} (lang, name, value) VALUES ($1, $2, $3);`,
    [data.lang, data.name, data.value]
  );
  return task;
}

function update(id, data) {
  data = transformData(data);
  data.id = id;
  const task = execQuery(
    `UPDATE ${tableName} 
        SET value=$1
        WHERE id=$2;`,
    [data.value, data.id]
  );
  return task;
}

function list(query) {
  const builder = new queryBuilder();
  const filter = query.filter ? toJson(query.filter) : {};
  builder.from(tableName);
  if (filter.names && filter.names.length) {
    builder.where(`name IN('${filter.names.join("','")}')`);
  }
  if (filter.langs && filter.langs.length) {
    builder.where(`lang IN('${filter.langs.join("','")}')`);
  }
  return execQuery(builder.getSql());
}

function showById(id) {
  return execQuery(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
}

function exist({lang, name}) {
  return execQuery(`SELECT * FROM ${tableName} WHERE lang = $1 AND name = $2`, [lang, name]);
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
  exist,
  deleteById,
};
