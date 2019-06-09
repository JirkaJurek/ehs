"use strict";

const sql = require("./sql");

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

module.exports.add = data => {
  return sql.add(data);
};

module.exports.update = (id, data) => {
  return sql.update(id, data);
};

module.exports.showById = id => {
  return sql.showById(id);
};

module.exports.list = async query => {
  return sql.list(query);
};

module.exports.delete = id => {
  return sql.deleteById(id);
};

module.exports.permissionsByUserId = async id => {
  const groups = (await sql.showByUserId(id)).rows;
  const permissions = groups.reduce((acc, group) => {
    if (group.id === 1) {
      return [
        ...acc,
        ["page", ["admin", "backend"]],
        ["DeleteButton", ["Question", "Section", "Form"]]
      ];
    } else if (group.id === 2) {
      return [...acc, ["page", "backend"]];
    }
    return acc;
  }, []);
  return permissions;
};
module.exports.showByUserId = async id => {
  return (await sql.showByUserId(id)).rows;
};
