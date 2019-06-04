"use strict";

const { execQuery, queryBuilder } = require("../db");
const tableName = "sections";

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
    `INSERT INTO ${tableName} (name, description, index, form_id) VALUES ($1, $2, $3, $4);`,
    [data.name, data.description, data.index, data.form_id]
  );
  return task;
}

function update(id, data) {
  data = transformData(data);
  data.id = id;
  const task = execQuery(
    `UPDATE ${tableName} 
        SET name=$1,
        description=$2,
        index=$3,
        form_id=$5
        WHERE id=$4;`,
    [data.name, data.description, data.index, data.id, data.form_id]
  );
  return task;
}

function list(query) {
  const builder = new queryBuilder();
  const filter = query.filter ? toJson(query.filter) : {};
  builder
    .from(tableName)
    .columns(`${tableName}.*, forms.name AS form_name`)
    .join("forms", `forms.id = ${tableName}.form_id`, "forms");
  if (filter.formIds && filter.formIds.length) {
    builder.where(`form_id IN('${filter.formIds.join("','")}')`);
  }
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
