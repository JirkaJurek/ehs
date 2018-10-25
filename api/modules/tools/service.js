'use strict'

const sql = require('./sql');
const {map, assoc} = require('ramda');

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

module.exports.addRevisions = async ({ items, revision}) => {
    const z = await Promise.all(map((x) => {
        return sql.addRevision(assoc('toolId', x, revision));
    }, items))
    return z;
};

module.exports.listCategories = (query) => {
    return sql.listCategories();
};

module.exports.addCategories = (data) => {
    return sql.addCategories(data);
};

module.exports.addRevisionType = async (data) => {
    return sql.addRevisionType(data);
};

module.exports.updateRevisionType = async (data) => {
    return sql.updateRevisionType(data);
};

module.exports.listUpcomingRevisions = async () => {
    return sql.listUpcomingRevisions();
};

module.exports.listRevisionType = () => {
    return sql.listRevisionType();
};


