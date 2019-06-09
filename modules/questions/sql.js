"use strict";

const { execQuery, queryBuilder } = require("../db");
const tableName = "questions";

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

const transformData = data => {
  // data.img = '\\x' + data.img;
  return data;
};

async function add(data) {
  data = transformData(data);
  let task;
  if (data.img) {
    data.img.on("data", async d => {
      task = execQuery(
        `INSERT INTO ${tableName} (text, section_id, index, img) VALUES ($1, $2, $3, $4);`,
        [data.text, data.section_id, data.index, d]
      );
    });
  } else {
    task = execQuery(
      `INSERT INTO ${tableName} (text, section_id, index) VALUES ($1, $2, $3);`,
      [data.text, data.section_id, data.index]
    );
  }

  return task;
}

function update(id, data) {
  data = transformData(data);
  data.id = id;
  let task;
  if (data.img) {
    data.img.on("data", async d => {
      task = execQuery(
        `UPDATE ${tableName} 
          SET text=$1,
          section_id=$3,
          img=$5,
          index=$4
          WHERE id=$2;`,
        [data.text, data.id, data.section_id, data.index, d]
      );
    });
  } else {
    task = execQuery(
      `UPDATE ${tableName}
          SET text=$1,
          section_id=$3,
          index=$4
          WHERE id=$2;`,
      [data.text, data.id, data.section_id, data.index]
    );
  }
  return task;
}

function list(query) {
  const builder = new queryBuilder();
  const filter = query.filter ? toJson(query.filter) : {};
  builder
    .from(tableName)
    .columns(
      `${tableName}.section_id,${tableName}.index,${tableName}.text, ${tableName}.id,  sec.name AS section_name`
    )
    .join("sections", `sec.id = ${tableName}.section_id`, "sec");
  if (filter.sectionIds && filter.sectionIds.length) {
    builder.where(`section_id IN('${filter.sectionIds.join("','")}')`);
  }
  builder.where(`${tableName}.active = true`);
  builder.orderBy(`${tableName}.id`, "true");
  return execQuery(builder.getSql());
}

function showById(id) {
  return execQuery(
    `SELECT ${tableName}.section_id,${tableName}.index,${tableName}.text, ${tableName}.id FROM ${tableName} WHERE id = $1`,
    [id]
  );
}

function showImgById(id) {
  return execQuery(`SELECT ${tableName}.img FROM ${tableName} WHERE id = $1`, [
    id
  ]);
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
  deleteById,
  showImgById
};
