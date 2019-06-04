"use strict";

const { execQuery, escape, queryBuilder } = require("../db");
const { map, omit, values } = require("ramda");
const tableName = "user";

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
  data.hasKey = data.hasKey ? 1 : 0;
  return data;
};

function add(data) {
  data = transformData(data);

  const user = execQuery(
    `INSERT INTO ${tableName} (
      degree,
      firstName,
      lastName,
      personalNumber,
      description,
      nick,
      wardrobe,
      dateOfOnset,
      personalIdentificationNumber,
      address,
      phone,
      healthInsurance,
      foodCart,
      preventiveInspection,
      shirtSize,
      tShirtSize,
      sizeWorkTrousers,
      sizeWorkBlouse,
      jacketSize,
      sweatshirtSize,
      shoeSize,
      hasKey,
      codeEZS,
      halfMask
    ) VALUES (
      :degree,
      :firstName,
      :lastName,
      :personalNumber,
      :description,
      :nick,
      :wardrobe,
      :dateOfOnset,
      :personalIdentificationNumber,
      :address,
      :phone,
      :healthInsurance,
      :foodCart,
      :preventiveInspection,
      :shirtSize,
      :tShirtSize,
      :sizeWorkTrousers,
      :sizeWorkBlouse,
      :jacketSize,
      :sweatshirtSize,
      :shoeSize,
      :hasKey,
      :codeEZS,
      :halfMask
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
        personalNumber=:personalNumber,
        description=:description,
        wardrobe=:wardrobe,
        dateOfOnset=:dateOfOnset,
        personalIdentificationNumber=:personalIdentificationNumber,
        address=:address,
        phone=:phone,
        healthInsurance=:healthInsurance,
        foodCart=:foodCart,
        preventiveInspection=:preventiveInspection,
        shirtSize=:shirtSize,
        tShirtSize=:tShirtSize,
        sizeWorkTrousers=:sizeWorkTrousers,
        sizeWorkBlouse=:sizeWorkBlouse,
        jacketSize=:jacketSize,
        sweatshirtSize=:sweatshirtSize,
        shoeSize=:shoeSize,
        hasKey=:hasKey,
        codeEZS=:codeEZS,
        halfMask=:halfMask
        WHERE id=:id;`,
    data
  );

  // TODO update všech tabulek kde se ukládá user(employee)
  return user;
}

async function list(query, withSecretData) {
  const builder = new queryBuilder();
  builder.from(tableName).groupBy(`${tableName}.id`);
  builder.where("deletedAt IS NULL");
  const data = await execQuery(builder.getSql());
  return withSecretData === true ? data : map(omit(["password"]), data);
}

async function showById(id, withSecretData) {
  const data = await execQuery(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
  return withSecretData === true ? data : omit(["password"], data);
}

async function showByNick(nick, withSecretData) {
  const data = await execQuery(`SELECT * FROM ${tableName} WHERE nick = ?`, [
    nick
  ]);
  return withSecretData === true ? data : omit(["password"], data);
}

function deleteById(toolId) {
  // k name přidat (smazáno) a všude kde je použit to updatnout
  return execQuery(`UPDATE ${tableName} SET deletedAt=NOW() WHERE id = ?;`, [
    toolId
  ]);
}

const permissionFunction = {
  permissionByUserId: userId => {
    return execQuery(
      `SELECT userPermissionId FROM user_permission WHERE userId = ?`,
      [userId]
    );
  },
  permissionByUserIdDetail: userId => {
    return execQuery(
      `SELECT ups.*, up.config FROM user_permission AS up
      JOIN user_permissions AS ups ON up.userPermissionId = ups.id
      WHERE userId = ?`,
      [userId]
    );
  },
  allPermissions: () => {
    return execQuery(`SELECT * FROM user_permissions`);
  },
  deletePermissionsByUserId: userId => {
    return execQuery(`DELETE FROM user_permission WHERE userId = ?;`, [userId]);
  },
  addPermission: data => {
    return execQuery(
      `INSERT INTO user_permission (userId, userPermissionId) VALUES (:userId, :userPermissionId);`,
      data
    );
  }
};

module.exports = {
  add,
  update,
  list,
  showById,
  showByNick,
  deleteById,
  userPermission: permissionFunction.permissionByUserId,
  userPermissions: permissionFunction.allPermissions,
  deletePermissionsByUserId: permissionFunction.deletePermissionsByUserId,
  addUserPermission: permissionFunction.addPermission,
  userPermissionDetail: permissionFunction.permissionByUserIdDetail
};
