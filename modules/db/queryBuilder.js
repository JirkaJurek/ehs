"use strict";
const Client = require("mariasql");

module.exports = class QueryBuilder {
  constructor() {
    this.config = {
      from: {},
      innerJoin: [],
      leftJoin: [],
      where: [],
      having: []
    };
  }

  from(table, as) {
    this.config.from = { table, as };
    return this;
  }

  join(table, sql, as) {
    this.config.innerJoin.push({ table, sql, as });
    return this;
  }

  leftJoin(table, sql, as) {
    this.config.leftJoin.push({ table, sql, as });
    return this;
  }

  limit(val) {
    this.config.limit = val;
    return this;
  }

  orderBy(sortBy, descending) {
    this.config.orderBy = { sortBy, descending };
    return this;
  }

  columns(val) {
    this.config.columns = val;
    return this;
  }

  where(val) {
    this.config.where.push(val);
    return this;
  }

  having(val) {
    this.config.having.push(val);
    return this;
  }

  groupBy(val) {
    this.config.groupBy = val;
    return this;
  }

  setConfig(name, value) {
    this.config[name] = value;
    return this;
  }

  getSql() {
    let sql = `
        SELECT ${this.config.columns ? Client.escape(this.config.columns) : "*"}
        FROM ${Client.escape(this.config.from.table)}${
      this.config.from.as ? " AS " + this.config.from.as : ""
    }
    `;
    if (this.config.innerJoin) {
      this.config.innerJoin.forEach(data => {
        sql += ` JOIN ${Client.escape(data.table)}${
          data.as ? " AS " + data.as : ""
        } ON ${data.sql}`;
      });
    }
    if (this.config.leftJoin) {
      this.config.leftJoin.forEach(data => {
        sql += ` LEFT JOIN ${Client.escape(data.table)}${
          data.as ? " AS " + data.as : ""
        } ON ${data.sql}`;
      });
    }
    if (this.config.where && this.config.where.length) {
      sql += ` WHERE ${this.config.where.join(" AND ")}`;
    }
    if (this.config.groupBy) {
      sql += ` GROUP BY ${Client.escape(this.config.groupBy)}`;
    }
    if (this.config.having && this.config.having.length) {
      sql += ` HAVING ${this.config.having.join(" AND ")}`;
    }
    if (this.config.orderBy && this.config.orderBy.sortBy) {
      sql += ` ORDER BY ${Client.escape(this.config.orderBy.sortBy)} ${
        this.config.orderBy.descending == "true" ? "DESC" : "ASC"
      }`;
    }
    if (this.config.limit) {
      sql += ` LIMIT ${parseInt(this.config.limit)}`;
    }
    return sql;
  }
};
