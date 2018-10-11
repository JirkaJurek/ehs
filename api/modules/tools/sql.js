"use strict";

const { execQuery, escape, queryBuilder } = require("../db");
const { map, clone, isEmpty, head, prop } = require("ramda");
const moment = require("moment");
const tableName = "tool";

function testConnection() {
  const b = execQuery("SHOW DATABASES", null, { useArray: true });
  console.log(b);
}

function add(data) {
  data.revisions = "[]";
  data.categoriesJSON = data.categories
    ? JSON.stringify(data.categories)
    : "[]";
  data.filesJSON = data.files ? JSON.stringify(data.files) : null;
  if (data.employee) {
    data.employeeJSON = JSON.stringify(data.employee);
    data.employeeId = data.employee.value;
  }
  const tool = execQuery(
    `INSERT INTO ${tableName} (supplier, categories, name, revisions, startWork, seriesNumber, machineNumber, inventoryNumber, yearOfManufacture, comment, employee, repair, price, filter1, filter2, filter3, files, guaranteeInto, supplierId, employeeId, revisionCard, inStock) VALUES (:supplier, :categoriesJSON , :name, :revisions, :startWork, :seriesNumber, :machineNumber, :inventoryNumber, :yearOfManufacture, :comment, :employeeJSON, :repair, :price, :filter1, :filter2, :filter3, :filesJSON, :guaranteeInto, :supplierId, :employeeId, :revisionCard, :inStock);`,
    data
  );
  tool.then(rows => {
    if (data.categories) {
      map(categoryData => {
        categoryFunction.add({
          toolId: rows.info.insertId,
          categoryId: categoryData.value
        });
      }, data.categories);
    }
  });
  return tool;
}

function update(id, data) {
  data.categoriesJSON = data.categories
    ? JSON.stringify(data.categories)
    : "[]";
  data.filesJSON = data.files ? JSON.stringify(data.files) : null;
  if (data.employee) {
    data.employeeJSON = JSON.stringify(data.employee);
    data.employeeId = data.employee.value;
  }
  data.id = id;
  const tool = execQuery(
    `UPDATE ${tableName} 
        SET supplier=:supplier, categories=:categoriesJSON, name=:name, startWork=:startWork, seriesNumber=:seriesNumber, machineNumber=:machineNumber, inventoryNumber=:inventoryNumber, yearOfManufacture=:yearOfManufacture, comment=:comment, employee=:employeeJSON, repair=:repair, price=:price, filter1=:filter1, filter2=:filter2, filter3=:filter3, files=:filesJSON, guaranteeInto=:guaranteeInto, supplierId=:supplierId, employeeId=:employeeId, revisionCard=:revisionCard, inStock=:inStock
        WHERE id=:id;`,
    data
  );

  // TODO ukládání files stejně jako u kategorií

  tool.then(rows => {
    if (data.categories) {
      categoryFunction.removeAllOld(rows.info.insertId).then(() => {
        map(categoryData => {
          categoryFunction.add({
            toolId: rows.info.insertId,
            categoryId: categoryData.value
          });
        }, data.categories);
      });
    }
  });
  return tool;
}

const categoryFunction = {
  removeAllOld: toolId => {
    return execQuery(`DELETE FROM tool_category WHERE id_tool = ?;`, [toolId]);
  },
  add: data => {
    return execQuery(
      `INSERT INTO tool_category (id_tool, id_category) VALUES (:toolId, :categoryId);`,
      data
    );
  }
};

const revisionFunction = {
  add: async data => {
    await execQuery(
      `INSERT INTO tool_revision (id_tool, date, description, who) VALUES (:toolId, :date, :description, :who);`,
      data
    );
    await execQuery(
      `UPDATE ${tableName} SET revisions=:revision WHERE id = :toolId;`,
      { revision: JSON.stringify(revisions), toolId: data.toolId }
    );
    return true;
  },
  allById: id => {
    return execQuery(
      `SELECT * FROM tool_revision WHERE id_tool = ? ORDER BY \`date\` DESC`,
      [id]
    );
  }
};

function list(query) {
  const builder = new queryBuilder();
  const filter = query.filter ? JSON.parse(query.filter) : {};
  builder
    .from(tableName)
    .where("deletedAt IS NULL")
    .groupBy(`${tableName}.id`)
    .limit(100);
  if (query.sortBy) {
    builder.orderBy(query.sortBy, query.descending);
  }
  if (filter.categories && filter.categories.length) {
    builder.join("tool_category", `tc.id_tool = ${tableName}.id`, "tc");
    builder.where(
      `tc.id_category IN(${filter.categories
        .filter(x => Number.isInteger(x))
        .join(",")})`
    );
  }
  if (filter.employee && filter.employee.length) {
    builder.where(
      `${tableName}.employeeId IN(${filter.employee
        .filter(x => Number.isInteger(x))
        .join(",")})`
    );
  }
  if (filter.search && !isEmpty(filter.search)) {
    builder.where(
      `MATCH(supplier, categories, name, revisionCard, seriesNumber, machineNumber, inventoryNumber, comment, employee, filter1, filter2, filter3) AGAINST("${escape(
        filter.search
      )}")`
    );
  }
  console.log(builder.getSql());
  return execQuery(builder.getSql());
}

function showById(id) {
  return execQuery(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
}

function deleteById(toolId) {
  return execQuery(`UPDATE ${tableName} SET deletedAt=NOW() WHERE id = ?;`, [
    toolId
  ]);
}

module.exports = {
  testConnection,
  add,
  update,
  list,
  showById,
  addRevision: revisionFunction.add,
  deleteById
};
