'use strict'

const { execQuery } = require('../db');
const tableName = 'tool';

function testConnection() {
    const b = execQuery('SHOW DATABASES', null, { useArray: true });
    console.log(b);
}

function add(data) {
    return execQuery(
        `INSERT INTO ${tableName} (supplier, categories, name, revizion, startWork, seriesNumber, internal, external, externalMaintenance, nextRevision, comment, employee, revisions, repair, price, filter1, filter2, filter3, files, guaranteeInto, supplierId) VALUES (:supplier, :categories, :name, :revizion, :startWork, :seriesNumber, :internal, :external, :externalMaintenance, :nextRevision, :comment, :employee, :revisions, :repair, :price, :filter1, :filter2, :filter3, :files, :guaranteeInto, :supplierId);`,
        data
    );
}

function list() {
    return execQuery(`SELECT * FROM ${tableName} LIMIT 100`);
}

function showById(id) {
    return execQuery(`SELECT * FROM ${tableName} WHERE id = ?`, [ id ]);
}

module.exports = {
    testConnection,
    add,
    list,
    showById,
}