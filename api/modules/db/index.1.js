"use strict";
/*
require("dotenv").config();

const { always, cond, test } = require("ramda");
const queryBuilder = require("./queryBuilder");

const Client = require("mariasql");
function newConect() {
  return new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_DBNAME,
    charset: "utf8"
  });
}
let db = newConect();
let destroyDb = null;

module.exports.db = db;
module.exports.escape = Client.escape;

module.exports.execQuery = (str, values, config, cb, noLog = false) =>
  new Promise((resolve, reject) => {
    if (destroyDb) {
      clearTimeout(destroyDb);
    }
    if (!db.connecting) {
      db = newConect();
    }
    db.query(str, values, config, (error, data) => {
      destroyDb = setTimeout(() => {
        if (db.connected || db.connecting || !db.closing) {
          db.end();
        }
      }, 60000);
      db.end();
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

module.exports.queryBuilder = queryBuilder;

/*
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  connectionLimit: 5
});

module.exports.db = pool.getConnection();
module.exports.execQuery = async (str, values, config, cb) => {
    return pool.query(str, values, config, cb);
}

module.exports.escape = async () => {
    const conn = await pool.getConnection();
    return conn.escape;
}
*/
