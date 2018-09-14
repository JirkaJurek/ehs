'use strict'

const { execQuery } = require('../db');
const tableName = 'tool';

async function testConnection() {
    const b = await execQuery('SHOW DATABASES', null, { useArray: true });
    console.log(b);
}

async function add(data) {
    return await execQuery(
        `INSERT INTO ${tableName} (supplier, categories, name, revizion, startWork, seriesNumber, internal, external, externalMaintenance, nextRevision, comment, employee, revisions, repair, price, filter1, filter2, filter3, files, guaranteeInto, supplierId) VALUES (:supplier, :categories, :name, :revizion, :startWork, :seriesNumber, :internal, :external, :externalMaintenance, :nextRevision, :comment, :employee, :revisions, :repair, :price, :filter1, :filter2, :filter3, :files, :guaranteeInto, :supplierId);`,
        data
    );
}

async function list() {
    return await execQuery(`SELECT * FROM ${tableName} LIMIT 10`);
}

module.exports = {
    testConnection,
    add,
    list,
}