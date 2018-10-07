'use strict'

const { execQuery, escape } = require('../db');
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
        `INSERT INTO ${tableName} (supplier, categories, name, revisions, startWork, seriesNumber, internal, external, revisionInterval, nextRevision, comment, employee, repair, price, filter1, filter2, filter3, files, guaranteeInto, supplierId, employeeId, revisionCard, inStock) VALUES (:supplier, :categoriesJSON , :name, :revisions, :startWork, :seriesNumber, :internal, :external, :revisionIntervalJSON, :nextRevision, :comment, :employeeJSON, :repair, :price, :filter1, :filter2, :filter3, :files, :guaranteeInto, :supplierId, :employeeId, :revisionCard, :inStock);`,
        data
    );
    tool.then((rows) => {
        if (data.categories) {
            map((categoryData) => {
                categoryFunction.add({
                    toolId: rows.info.insertId,
                    categoryId: categoryData.value
                })
            }, data.categories);
        }
    });
    return tool;
}

function update(id, data) {
    data.categoriesJSON = data.categories ? JSON.stringify(data.categories) : '[]';
    data.revisionIntervalJSON = data.revisionInterval ? JSON.stringify(data.revisionInterval) : null;
    if (data.employee) {
        data.employeeJSON = JSON.stringify(data.employee);
        data.employeeId = data.employee.value;
    }
    data.id = id;
    const tool = execQuery(
        `UPDATE ${tableName} 
        SET supplier=:supplier, categories=:categoriesJSON, name=:name, startWork=:startWork, seriesNumber=:seriesNumber, internal=:internal, external=:external, revisionInterval=:revisionIntervalJSON, nextRevision=:nextRevision, comment=:comment, employee=:employeeJSON, repair=:repair, price=:price, filter1=:filter1, filter2=:filter2, filter3=:filter3, files=:files, guaranteeInto=:guaranteeInto, supplierId=:supplierId, employeeId=:employeeId, revisionCard=:revisionCard, inStock=:inStock
        WHERE id=:id;`,
        data
    );
    tool.then((rows) => {
        if (data.categories) {
            categoryFunction.removeAllOld(rows.info.insertId).then(() => {
                map((categoryData) => {
                    categoryFunction.add({
                        toolId: rows.info.insertId,
                        categoryId: categoryData.value
                    })
                }, data.categories);
            });
        }
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

function list(query) {
    let sql = `
    SELECT * FROM ${tableName}
    WHERE deletedAt IS NULL
    `;
    if (query.sortBy) {
        sql += ` ORDER BY ${escape(query.sortBy)} ${query.descending == 'true' ? 'DESC' : 'ASC'}`
    }
    if (query.filter) {
        //sql += ` ORDER BY ${escape(query.sortBy)} ${query.descending == 'true' ? 'DESC' : 'ASC'}`
    }
    sql += ' LIMIT 100';

    return execQuery(sql);
}

function showById(id) {
    return execQuery(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
}

function deleteById(toolId) {
    return execQuery(`UPDATE ${tableName} SET deletedAt=NOW() WHERE id = ?;`, [toolId]);
}

module.exports = {
    testConnection,
    add,
    update,
    list,
    showById,
    addRevision: revisionFunction.add,
    deleteById,
}