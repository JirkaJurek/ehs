'use strict'

var sql = require('./sql');

module.exports.testConnection = () => {
    sql.testConnection();
};

module.exports.add = (data) => {
    sql.add(data);
};

module.exports.list = (data) => {
    return sql.list(data);
};


