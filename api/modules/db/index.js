"use strict";

require("dotenv").config();

const { always, cond, test } = require("ramda");
const queryBuilder = require("./queryBuilder");

const { Pool, Client } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  port: 5432
});

module.exports.execQuery = async (str, values, config, cb, noLog = false) => {
  const client = await pool.connect();
  try {
    return client.query(str, values);
  } finally {
    client.release();
  }
};

module.exports.queryBuilder = queryBuilder;
