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

module.exports = {
    list
}