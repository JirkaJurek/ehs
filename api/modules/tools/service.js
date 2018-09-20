'use strict'

var sql = require('./sql');

module.exports.testConnection = () => {
    sql.testConnection();
};

module.exports.add = (data) => {
    sql.add(data);
};

module.exports.showById = (id) => {
    return sql.showById(id);
};

module.exports.list = (data) => {
    return sql.list(data);
};

module.exports.addRevision = (data) => {
    console.log(data);
    sql.addRevision(data);
};


