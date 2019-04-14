"use strict";

const { execQuery, escape, queryBuilder } = require("../../db");
const tableName = "mobile_tariffs";

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

const transformData = data => {
  data.degree = data.degree ? data.degree : "";
  data.isCompanyPhone = data.isCompanyPhone ? 1 : 0;
  return data;
};

function add(data) {
  data = transformData(data);

  const user = execQuery(
    `INSERT INTO ${tableName} (
      degree,
      firstName,
      lastName,
      phoneNumber,
      phoneTariff,
      isCompanyPhone,
      phoneType,
      buyPhone,
      description
    ) VALUES (
      :degree,
      :firstName,
      :lastName,
      :phoneNumber,
      :phoneTariff,
      :isCompanyPhone,
      :phoneType,
      :buyPhone,
      :description
    );`,
    data
  );
  return user;
}

function update(id, data) {
  data = transformData(data);

  const user = execQuery(
    `UPDATE ${tableName} 
        SET 
        degree=:degree,
        firstName=:firstName,
        lastName=:lastName,
        phoneNumber=:phoneNumber,
        phoneTariff=:phoneTariff,
        isCompanyPhone=:isCompanyPhone,
        phoneType=:phoneType,
        buyPhone=:buyPhone,
        description=:description
        WHERE id=:id;`,
    data
  );

  return user;
}

const list = async query => {
  const builder = new queryBuilder();
  builder.from(tableName).groupBy(`${tableName}.id`);
  builder.where("deletedAt IS NULL");
  return execQuery(builder.getSql());
};

const showById = async id =>
  execQuery(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);

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
