"use strict";

const { execQuery, queryBuilder } = require("../db");
const tableName = "groups";

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
    `INSERT INTO ${tableName} (name, comment) VALUES ($1, $2);`,
    [data.name, data.comment]
  );
  return task;
}

function update(id, data) {
  data = transformData(data);
  data.id = id;
  const task = execQuery(
    `UPDATE ${tableName} 
        SET name=$1,
        comment=$2
        WHERE id=$3;`,
    [data.name, data.comment, data.id]
  );
  return task;
}

function list(query) {
  const builder = new queryBuilder();
  builder.from(tableName);
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
function showByUserId(userId) {
  const builder = new queryBuilder();
  builder
    .from('groups_user_rel', 'gur')
    .columns(`${tableName}.*`)
    .join(tableName, `gur.gid = ${tableName}.id`)
    .where(
      `gur.uid = ${parseInt(userId)}`
    );
  return execQuery(builder.getSql());
}

module.exports = {
  add,
  update,
  list,
  showById,
  deleteById,
  showByUserId,
};
