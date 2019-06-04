"use strict";

const sql = require("./sql");

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

module.exports.save = async data => {
  const exist = (await sql.exist(data)).rows;
  if(exist.length > 0) {
    return sql.update(exist[0].id, data);
  }
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
