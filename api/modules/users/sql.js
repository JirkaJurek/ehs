"use strict";

const { execQuery, escape, queryBuilder } = require("../db");
const {} = require("ramda");
const tableName = "user";

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

function add(data) {
  const user = execQuery(
    `INSERT INTO ${tableName} (name, firstName, lastName) VALUES (:name, :firstName , :lastName);`,
    data
  );
  return user;
}

function update(id, data) {
  const user = execQuery(
    `UPDATE ${tableName} 
        SET name=:name, firstName=:firstName, lastName=:lastName
        WHERE id=:id;`,
    data
  );

  // TODO update všech tabulek kde se ukládá user(employee)
  return user;
}

function list(query) {
  const builder = new queryBuilder();
  builder.from(tableName).groupBy(`${tableName}.id`);
  builder.where("deletedAt IS NULL");
  return execQuery(builder.getSql());
}

function showById(id) {
  return execQuery(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
}

function deleteById(toolId) {
  // k name přidat (smazáno) a všude kde je použit to updatnout
  return execQuery(`UPDATE ${tableName} SET deletedAt=NOW() WHERE id = ?;`, [
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
