'use strict'

var sql = require('./sql');
var {map, assoc} = require('ramda');

module.exports.testConnection = () => {
    sql.testConnection();
};

module.exports.add = (data) => {
    sql.add(data);
};

module.exports.update = (id, data) => {
    sql.update(id, data);
};

module.exports.showById = (id) => {
    return sql.showById(id);
};

module.exports.list = (query) => {
    return sql.list(query);
};

module.exports.delete = (id) => {
    return sql.deleteById(id);
};

module.exports.deleteMore = (data) => {
    return map(x => {
        return sql.deleteById(x);
    }, data.items);
};

module.exports.addRevision = (data) => {
    console.log(data);
    sql.addRevision(data);
};

module.exports.addRevisions = ({ items, revision}) => {
    return map(x => {
        return sql.addRevision(assoc('toolId', x, revision))
    }, items);
};


