"use strict";

const { execQuery, queryBuilder } = require("../db");
const tableName = "forms";

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
    `INSERT INTO ${tableName} (name) VALUES ($1);`,
    [data.name]
  );
  return task;
}

function update(id, data) {
  data = transformData(data);
  data.id = id;
  const task = execQuery(
    `UPDATE ${tableName} 
        SET name=$1
        WHERE id=$2;`,
        [data.name, data.id]
  );
  return task;
}

function list(query) {
  const builder = new queryBuilder();
  const filter = query.filter ? toJson(query.filter) : {};
  builder.from(tableName);
  builder.where("active = true");
  builder.orderBy("id", "true");
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
