'use strict'

require('dotenv').config();

const Client = require('mariasql');
const db = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_DBNAME
});

module.exports.db = db;

module.exports.execQuery = (str, values, config, cb) => new Promise((resolve, reject) => {
    db.query(str, values, config, (error, data) => {
        db.end();
        if (error) {
            reject(error);
        } else {
            resolve(data);
        }
    });
});