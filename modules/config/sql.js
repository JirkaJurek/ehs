'use strict'

const { execQuery, queryBuilder, escape } = require('../db');
const tableName = 'config';

function list(query) {
    const builder = new queryBuilder();
    builder
      .from(tableName);

    if (query.name) {
        builder.where(`name = '${escape(query.name)}'`)
    }
    console.log(builder.getSql());
    return execQuery(builder.getSql());
}

function editByName(data) {
    data.dataJSON = data.data ? JSON.stringify(data.data) : null;
    return execQuery(
        `UPDATE ${tableName} 
            SET data=:dataJSON
            WHERE name=:name;`,
        data
      );
}
module.exports = {
    list,
    editByName
}