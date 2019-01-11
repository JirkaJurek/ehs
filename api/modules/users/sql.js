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

const transformData = data => {
  data.degree = data.degree ? data.degree : "";
  return data;
};

function add(data) {
  data = transformData(data);

  const user = execQuery(
    `INSERT INTO ${tableName} (degree, firstName, lastName, personalNumber, description) VALUES (:degree, :firstName, :lastName, :personalNumber, :description);`,
    data
  );
  return user;
}

function update(id, data) {
  data = transformData(data);

  const user = execQuery(
    `UPDATE ${tableName} 
        SET degree=:degree, firstName=:firstName, lastName=:lastName, personalNumber=:personalNumber, description=:description
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

const permissionFunction = {
  permissionByUserId: userId => {
    return execQuery(
      `SELECT userPermissionId FROM user_permission WHERE userId = ?`,
      [userId]
    );
  },
  permissionByUserIdDetail: userId => {
    return execQuery(
      `SELECT ups.* FROM user_permission AS up
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
  deleteById,
  userPermission: permissionFunction.permissionByUserId,
  userPermissions: permissionFunction.allPermissions,
  deletePermissionsByUserId: permissionFunction.deletePermissionsByUserId,
  addUserPermission: permissionFunction.addPermission,
  userPermissionDetail: permissionFunction.permissionByUserIdDetail,
};
