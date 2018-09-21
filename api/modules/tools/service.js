'use strict'

var sql = require('./sql');
var {map, assoc} = require('ramda');

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

module.exports.addRevisions = ({ items, revision}) => {
    map(x => {
        sql.addRevision(assoc('toolId', x, revision))
    }, items);
};


