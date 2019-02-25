"use strict";

const sql = require("./sql");
const { head, omit } = require("ramda");
const { createHmac } = require("crypto");
const jwtToken = require("jsonwebtoken");

const add = data => {
  return sql.add(data);
};

const update = (id, data) => {
  return sql.update(id, data);
};

const showById = (id, withSecretData) => {
  return sql.showById(id, withSecretData);
};

const showByNick = (nick, withSecretData) => {
  return sql.showByNick(nick, withSecretData);
};

const list = (query, withSecretData) => {
  return sql.list(query, withSecretData);
};

const isActive = async id => {
  const user = head(await sql.showById(id));
  return user && user.deletedAt === null;
};

const deleteUser = id => {
  return sql.deleteById(id);
};

const getUserName = (item, defaultValue = "") => {
  return item
    ? `${item.degree} ${item.firstName} ${item.lastName}`
    : defaultValue;
};

const userPermission = id => {
  return sql.userPermission(id);
};

const userPermissionDetail = id => {
  return sql.userPermissionDetail(id);
};

const userPermissions = () => {
  return sql.userPermissions();
};

const addUserPermission = async (userId, data) => {
  await sql.deletePermissionsByUserId(userId);
  return Promise.all(
    data.map(permissionId => {
      return sql.addUserPermission({ userId, userPermissionId: permissionId });
    })
  );
};

const createPasswordHash = password => {
  return createHmac("md5", password)
    .update(process.env.CRYPTO_SECRET)
    .digest("hex");
};

const login = async ({ username, password }) => {
  const user = head(await showByNick(username, true));
  const hash = createPasswordHash(password);
  console.log(hash);
  const status = user.password === hash;
  const basicToken = status
    ? jwtToken.sign(omit(["password"], user), process.env.JWT_SECRET)
    : "";

  return {
    status,
    basicToken
  };
};

module.exports = {
  delete: deleteUser,
  createPasswordHash,
  showById,
  showByNick,
  add,
  update,
  showById,
  list,
  isActive,
  getUserName,
  userPermission,
  userPermissionDetail,
  userPermissions,
  addUserPermission,
  login
};
