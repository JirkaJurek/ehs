"use strict";

const { execQuery, escape, queryBuilder } = require("../db");
const { map, omit, values } = require("ramda");
const tableName = "users";

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

function add(data) {
  return execQuery(
    `INSERT INTO ${tableName} (
      login,
      password
    ) VALUES (
      $1,
      $2
    ) RETURNING id;`,
    [data.login, data.password]
  );
}

async function update(id, data) {
  const updateData = [data.login, id];
  if (data.password && data.password.length > 1) {
    updateData.push(data.password);
  }
  return execQuery(
    `UPDATE ${tableName} 
        SET 
        ${data.password && data.password.length > 1 ? "password=$3," : ""}
        login=$1
        WHERE id=$2
        RETURNING id;`,
    updateData
  );
}

async function list(query, withSecretData) {
  const builder = new queryBuilder();
  builder
    .from(tableName)
    .columns(`${tableName}.*, array_agg(gur.gid) AS gids`)
    .leftJoin("groups_user_rel", `gur.uid = ${tableName}.id`, "gur")
    .groupBy(`${tableName}.id`);
  const data = (await execQuery(builder.getSql())).rows;
  return withSecretData === true ? data : map(omit(["password"]), data);
}

async function showById(id, withSecretData) {
  const builder = new queryBuilder();
  builder
    .from(tableName)
    .columns(`${tableName}.*, array_agg(gur.gid) AS gids`)
    .leftJoin("groups_user_rel", `gur.uid = ${tableName}.id`, "gur")
    .groupBy(`${tableName}.id`)
    .where(`id = $1`);

  const data = (await execQuery(builder.getSql(), [id])).rows;
  return withSecretData === true ? data : map(omit(["password"]), data);
}

async function showByNick(nick, withSecretData) {
  const data = (await execQuery(`SELECT * FROM ${tableName} WHERE login = $1`, [
    nick
  ])).rows;
  return withSecretData === true ? data : map(omit(["password"]), data);
}

function deleteById(toolId) {
  // return execQuery(`UPDATE ${tableName} SET deletedAt=NOW() WHERE id = $1;`, [
  //   toolId
  // ]);
}

const permissionFunction = {
  permissionByUserId: userId => {
    return execQuery(
      `SELECT userPermissionId FROM groups_user_rel WHERE userId = $1`,
      [userId]
    );
  },
  permissionByUserIdDetail: userId => {
    return execQuery(
      `SELECT ups.*, up.config FROM groups_user_rel AS up
      JOIN user_permissions AS ups ON up.userPermissionId = ups.id
      WHERE userId = $1`,
      [userId]
    );
  },
  allPermissions: () => {
    return execQuery(`SELECT * FROM groups_user_rel`);
  },
  deletePermissionsByUserId: userId => {
    return execQuery(`DELETE FROM groups_user_rel WHERE uid = $1;`, [userId]);
  },
  addPermission: data => {
    return execQuery(
      `INSERT INTO groups_user_rel (gid, uid) VALUES ($1, $2);`,
      [data.gid, data.uid]
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
