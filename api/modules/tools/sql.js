'use strict'

const { execQuery } = require('../db');
const tableName = 'tools';

async function testConnection() {
    const b = await execQuery('SHOW DATABASES', null, { useArray: true });
    console.log(b);
}

async function add(data) {
    return await execQuery(
        `INSERT INTO ${tableName} (name) VALUES (:name);`,
        data
    );
}


module.exports = {
    testConnection,
    add
}