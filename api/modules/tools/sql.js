'use strict'

const { execQuery } = require('../db');
const { map } = require('ramda');
const tableName = 'tool';

function testConnection() {
    const b = execQuery('SHOW DATABASES', null, { useArray: true });
    console.log(b);
}

function add(data) {
    data.revisions = '[]';
    data.categoriesJSON = data.categories ? JSON.stringify(data.categories) : '[]';
    data.revisionIntervalJSON = data.revisionInterval ? JSON.stringify(data.revisionInterval) : null;
    if (data.employee) {
        data.employeeJSON = JSON.stringify(data.employee);
        data.employeeId = data.employee.value;
    }
    const tool = execQuery(
        `INSERT INTO ${tableName} (supplier, categories, name, revisions, startWork, seriesNumber, internal, external, revisionInterval, nextRevision, comment, employee, repair, price, filter1, filter2, filter3, files, guaranteeInto, supplierId, employeeId) VALUES (:supplier, :categoriesJSON , :name, :revisions, :startWork, :seriesNumber, :internal, :external, :revisionIntervalJSON, :nextRevision, :comment, :employeeJSON, :repair, :price, :filter1, :filter2, :filter3, :files, :guaranteeInto, :supplierId, :employeeId);`,
        data
    );
    tool.then((rows) => {
        categoryFunction.removeAllOld(rows.info.insertId).then(() => {
            if (data.categories) {
                map((categoryData) => {
                    categoryFunction.add({
                        toolId: rows.info.insertId,
                        categoryId: categoryData.value
                    })
                }, data.categories);
            }
        });
    });
    return tool;
}

const categoryFunction = {
    removeAllOld: (toolId) => {
        return execQuery(`DELETE FROM tool_category WHERE id_tool = ?;`, [toolId])
    },
    add: (data) => {
        return execQuery(
            `INSERT INTO tool_category (id_tool, id_category) VALUES (:toolId, :categoryId);`,
            data
        )
    }
}

const revisionFunction = {
    add: async (data) => {
        await execQuery(
            `INSERT INTO tool_revision (id_tool, date, description, who) VALUES (:toolId, :date, :description, :who);`,
            data
        )
        const revisions = await revisionFunction.allById(data.toolId);
        await execQuery(
            `UPDATE ${tableName} SET revisions=:revision WHERE id = :toolId;`,
            { revision: JSON.stringify(revisions), toolId: data.toolId }
        )
        return true;
    },
    allById: (id) => {
        return execQuery(`SELECT * FROM tool_revision WHERE id_tool = ? ORDER BY \`date\` DESC`, [id]);
    }
}

function list() {
    return execQuery(`SELECT * FROM ${tableName} LIMIT 100`);
}

function showById(id) {
    return execQuery(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
}

module.exports = {
    testConnection,
    add,
    list,
    showById,
    addRevision: revisionFunction.add
}