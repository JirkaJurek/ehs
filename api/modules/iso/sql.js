"use strict";

const { execQuery, escape, queryBuilder } = require("../db");
const filesModule = require("../files");
const tableName = "iso";

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

const transformData = async data => {
  if (data.fileId) {
    data.file = JSON.stringify(await filesModule.service.showById(data.fileId));
  }
  return data;
};

async function add(data) {
  data = await transformData(data);
  const user = execQuery(
    `INSERT INTO ${tableName} (
        type,
        number,
        version,
        fileName,
        validFrom,
        processorId,
        processedDate,
        approverId,
        approvedDate,
        file,
        fileId
      ) VALUES (
        :type,
        :number,
        :version,
        :fileName,
        :validFrom,
        :processorId,
        :processedDate,
        :approverId,
        :approvedDate,
        :file,
        :fileId
      );`,
    data
  );
  return user;
}

async function update(id, data) {
  data = await transformData(data);
  const user = execQuery(
    `UPDATE ${tableName} 
        SET 
        number=:number,
        version=:version,
        fileName=:fileName,
        validFrom=:validFrom,
        processorId=:processorId,
        processedDate=:processedDate,
        approverId=:approverId,
        approvedDate=:approvedDate,
        file=:file,
        fileId=:fileId
        WHERE id=:id;`,
    data
  );

  // TODO update všech tabulek kde se ukládá user(employee)
  return user;
}

function list(query) {
  const builder = new queryBuilder();
  const filter = query.filter ? JSON.parse(query.filter) : {};

  builder.from(tableName).groupBy(`${tableName}.id`);

  if (filter.types && filter.types.length) {
    builder.where(`type IN('${filter.types.join("','")}')`);
  }

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

const revision = {
  listById: idIso => {
    return execQuery(
      `SELECT * FROM iso_revision WHERE idIso = ? ORDER BY createdAt DESC`,
      [idIso]
    );
  },
  add: data => {
    const revision = execQuery(
      `INSERT INTO iso_revision (
          idIso,
          indexNumber,
          publishedDate,
          result,
          approverId,
          processorId
        ) VALUES (
          :idIso,
          :indexNumber,
          :publishedDate,
          :result,
          :approverId,
          :processorId
        );`,
      data
    );
    return revision;
  }
};

module.exports = {
  add,
  update,
  list,
  showById,
  deleteById,
  revisionsById: revision.listById,
  addRevision: revision.add
};
