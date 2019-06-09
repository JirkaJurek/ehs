"use strict";

const sql = require("./sql");
const { head, omit, find, propEq } = require("ramda");
const { createHmac } = require("crypto");
const jwtToken = require("jsonwebtoken");
const groupsModule = require("../groups");

const transformData = data => {
  if (data.password) {
    data.password = createPasswordHash(data.password);
  }
  return data;
};

const afterSave = async (user, data) => {
  await sql.deletePermissionsByUserId(user.id);
  await Promise.all(
    data.gids.map(gid => {
      return sql.addUserPermission({
        uid: user.id,
        gid
      });
    })
  );
};

const add = async data => {
  data = transformData(data);
  const user = (await sql.add(data)).rows[0];
  await afterSave(user, data);
  return user;
};

const update = async (id, data) => {
  data = transformData(data);
  const user = (await sql.update(id, data)).rows[0];
  await afterSave(user, data);
  return user;
};

const showById = id => {
  return sql.showById(id);
};

const showByNick = (nick, withSecretData) => {
  return sql.showByNick(nick, withSecretData);
};

const list = async query => {
  return sql.list(query);
};

const deleteUser = id => {
  return sql.deleteById(id);
};

// const userPermission = id => {
//   return sql.userPermission(id);
// };
//
// const userPermissionDetail = id => {
//   return sql.userPermissionDetail(id);
// };
//
// const userPermissions = () => {
//   return sql.userPermissions();
// };
//
// const addUserPermission = async (userId, data) => {
//   await sql.deletePermissionsByUserId(userId);
//   return Promise.all(
//     data.map(permissionId => {
//       return sql.addUserPermission({ userId, userPermissionId: permissionId });
//     })
//   );
// };
//
const createPasswordHash = (password = "") => {
  return createHmac("md5", password)
    .update(process.env.CRYPTO_SECRET)
    .digest("hex");
};

const login = async ({ username, password }) => {
  const user = head(await showByNick(username, true));
  const hash = createPasswordHash(password);
  // console.log(hash);
  const status = user && user.password === hash;
  const userGroups = await groupsModule.service.showByUserId(user.id);

  const basicToken = status
    ? jwtToken.sign(omit(["password"], user), process.env.JWT_SECRET)
    : "";

  return {
    status: !!status,
    goTo: find(propEq("id", 3), userGroups) ? "/public" : "/admin",
    basicToken
  };
};

const isActive = async id => {
  const user = await sql.showById(id);
  return !!user;
  // return user && user.deletedAt === null;
};

module.exports = {
  delete: deleteUser,
  showById,
  add,
  update,
  list,
  login,
  isActive
  //   getUserName,
  //   userPermission,
  //   userPermissionDetail,
  //   userPermissions,
  //   addUserPermission,
  //   login
};
