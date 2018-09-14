'use strict'

var sql = require('./sql');

module.exports.testConnection = () => {
    sql.testConnection();
};

module.exports.add = (data) => {
    sql.add(data);
};


