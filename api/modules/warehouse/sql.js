"use strict";

const { execQuery, escape, queryBuilder } = require("../db");
const {} = require("ramda");
const tableName = "warehouse";

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

const transformData = data => {
  if (data.accountableEmployee) {
    data.accountableEmployeeJSON = JSON.stringify(data.accountableEmployee);
    data.accountableEmployeeId = data.accountableEmployee.id;
  }
  return data;
};

function add(data) {
  data = transformData(data);
  const user = execQuery(
    `INSERT INTO ${tableName} (number, name, accountableEmployee	, accountableEmployeeId, description) VALUES (:number, :name, :accountableEmployeeJSON, :accountableEmployeeId, :description);`,
    data
  );
  return user;
}

function update(id, data) {
  data = transformData(data);
  const user = execQuery(
    `UPDATE ${tableName} 
        SET number=:number, name=:name, accountableEmployee=:accountableEmployeeJSON, accountableEmployeeId=:accountableEmployeeId, description=:description
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
