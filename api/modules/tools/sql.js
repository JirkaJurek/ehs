"use strict";

const { execQuery, escape, queryBuilder } = require("../db");
const {
  add: aliasAdd,
  clone,
  flip,
  head,
  isEmpty,
  lensProp,
  map,
  nth,
  over,
  pipe,
  prop,
  split,
  subtract
} = require("ramda");
const moment = require("moment");
const tableName = "tool";

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

function testConnection() {
  const b = execQuery("SHOW DATABASES", null, { useArray: true });
  console.log(b);
}

const afterSaveOrUpdate = (data, toolId) => {
  if (data.categories) {
    categoryFunction.removeAllOld(toolId).then(() => {
      map(categoryData => {
        categoryFunction.add({
          toolId: toolId,
          categoryId: categoryData.id
        });
      }, data.categories);
    });
  }
  if (data.revisionTypes) {
    revisionTypeFunction.removeAllOld(toolId).then(() => {
      map(revisionType => {
        revisionTypeFunction.add({
          toolId: toolId,
          idToolRevisionTypes: revisionType.id
        });
      }, data.revisionTypes);
    });
  }
  /*
  if (data.items) {
    itemFunction.removeAllOld(toolId).then(() => {
      map(item => {
        itemFunction.add({
          toolId: toolId,
          ...item
        });
      }, data.items);
    });
  }
  */
};

const transformData = data => {
  data.categoriesJSON = data.categories
    ? JSON.stringify(data.categories)
    : "[]";
  data.revisionTypesJSON = data.revisionTypes
    ? JSON.stringify(data.revisionTypes)
    : "[]";
  data.filesJSON = data.files ? JSON.stringify(data.files) : null;
  data.itemsJSON = data.items ? JSON.stringify(data.items) : "[]";
  data.itemsHistoryJSON = data.itemsHistory
    ? JSON.stringify(data.itemsHistory)
    : "[]";
  if (data.warehouse) {
    data.warehouseJSON = JSON.stringify(data.warehouse);
    data.warehouseId = data.warehouse.value;
  }
  return data;
};

function add(data) {
  data.revisions = "[]";
  data = transformData(data);
  const tool = execQuery(
    `INSERT INTO ${tableName} (supplier, categories, name, shortName, revisions, revisionTypes, startWork, seriesNumber, machineNumber, inventoryNumber, code, yearOfManufacture, comment, employee, repair, price, filter1, filter2, filter3, files, guaranteeInto, supplierId, employeeId, revisionCard, inStock, items, itemsHistory) VALUES (:supplier, :categoriesJSON , :name, :shortName, :revisions, :revisionTypesJSON, :startWork, :seriesNumber, :machineNumber, :inventoryNumber, :code, :yearOfManufacture, :comment, :employeeJSON, :repair, :price, :filter1, :filter2, :filter3, :filesJSON, :guaranteeInto, :supplierId, :employeeId, :revisionCard, :inStock, :itemsJSON, :itemsHistoryJSON);`,
    data
  );
  tool.then(rows => {
    afterSaveOrUpdate(data, rows.info.insertId);
  });
  return tool;
}

function update(id, data) {
  data = transformData(data);
  data.id = id;
  const tool = execQuery(
    `UPDATE ${tableName} 
        SET supplier=:supplier, categories=:categoriesJSON, revisionTypes=:revisionTypesJSON, name=:name, shortName=:shortName, startWork=:startWork, seriesNumber=:seriesNumber, machineNumber=:machineNumber, inventoryNumber=:inventoryNumber, code=:code, yearOfManufacture=:yearOfManufacture, comment=:comment, employee=:employeeJSON, repair=:repair, price=:price, filter1=:filter1, filter2=:filter2, filter3=:filter3, files=:filesJSON, guaranteeInto=:guaranteeInto, supplierId=:supplierId, employeeId=:employeeId, revisionCard=:revisionCard, inStock=:inStock, items=:itemsJSON, itemsHistory=:itemsHistoryJSON
        WHERE id=:id;`,
    data
  );

  // TODO ukládání files stejně jako u kategorií

  tool.then(rows => {
    afterSaveOrUpdate(data, id);
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

const categoriesFunction = {
  add: data => {
    return execQuery(
      `INSERT INTO tool_categories (name, parentId) VALUES (:name, :parentId);`,
      data
    );
  },
  list: () => {
    return execQuery(`SELECT * FROM tool_categories`);
  }
};

const revisionFunction = {
  afterSaveOrUpdate: async toolId => {
    const revisions = await revisionFunction.allById(toolId);
    await execQuery(
      `UPDATE ${tableName} SET revisions=:revisions WHERE id = :toolId;`,
      { revisions: JSON.stringify(revisions), toolId: toolId }
    );
  },
  transformData: data => {
    const [c, y] = pipe(
      toJson,
      prop("revisionInterval"),
      toJson,
      prop("value"),
      split(" ")
    )(data.revisionType);
    data.revisionTypeJSON = data.revisionType
      ? JSON.stringify(data.revisionType)
      : null;
    data.revisionTypeId = data.revisionType ? data.revisionType.id : null;
    data.nextRevision = data.date
      ? moment(data.date)
          .add(c, y)
          .format("YYYY-MM-DD")
      : null;
    return data;
  },
  add: async data => {
    data = revisionFunction.transformData(data);
    await execQuery(
      `INSERT INTO tool_revision (id_tool, id_tool_revision_types, revisionType, date, nextRevision, description, who) VALUES (:toolId, :revisionTypeId, :revisionTypeJSON, :date, :nextRevision, :description, :who);`,
      data
    );
    await revisionFunction.afterSaveOrUpdate(data.toolId);
    return true;
  },
  update: async (id, data) => {
    data = revisionFunction.transformData(data);
    data.id = id;
    await execQuery(
      `UPDATE tool_revision SET id_tool_revision_types=:revisionTypeId, revisionType=:revisionTypeJSON, date=:date, nextRevision=:nextRevision, description=:description, who=:who 
        WHERE id = :id;`,
      data
    );
    await revisionFunction.afterSaveOrUpdate(data.id_tool);
    return true;
  },
  allById: async id => {
    return execQuery(
      `SELECT * FROM tool_revision WHERE id_tool = ? ORDER BY \`date\` DESC`,
      [id]
    );
  },
  addType: async data => {
    data.revisionIntervalJSON = data.revisionInterval
      ? JSON.stringify(data.revisionInterval)
      : "{}";
    await execQuery(
      `INSERT INTO tool_revision_types (name, revisionInterval, description) VALUES (:name, :revisionIntervalJSON, :description);`,
      data
    );
    return true;
  },
  updateType: async data => {
    data.revisionIntervalJSON = data.revisionInterval
      ? JSON.stringify(data.revisionInterval)
      : "{}";
    await execQuery(
      `UPDATE tool_revision_types
        SET name=:name, revisionInterval=:revisionIntervalJSON, description=:description
        WHERE id=:id;`,
      data
    );
    return true;
  },
  list: () => {
    return execQuery(
      `SELECT * FROM tool_revision_types WHERE deletedAt IS NULL`
    );
  },
  listUpcomingRevisions: async query => {
    const builder = new queryBuilder();
    const filter = query.filter ? JSON.parse(query.filter) : {};
    builder
      .columns(`tool_revision.*, MAX(nextRevision) as nextRevision`)
      .from("tool_revision")
      .join(tableName, `tool_revision.id_tool = tool.id`, "tool")
      .where(`tool.deletedAt IS NULL`)
      .groupBy("id_tool, id_tool_revision_types")
      .having(
        `nextRevision < DATE_SUB(NOW(), INTERVAL -${filter.daysBack || 30} DAY)`
      );
    if (filter.revisionTypes && filter.revisionTypes.length) {
      builder.where(
        `id_tool_revision_types IN(${filter.revisionTypes
          .map(x => parseInt(x))
          .filter(x => x > 0)
          .join(",")})`
      );
    }
    return execQuery(builder.getSql());
  },
  deleteRevisionType: toolId => {
    return execQuery(
      `UPDATE tool_revision_types SET deletedAt=NOW() WHERE id = ?;`,
      [toolId]
    );
  }
};

const revisionTypeFunction = {
  removeAllOld: toolId => {
    return execQuery(`DELETE FROM tool_revision_type WHERE id_tool = ?;`, [
      toolId
    ]);
  },
  add: data => {
    return execQuery(
      `INSERT INTO tool_revision_type (id_tool, id_tool_revision_types) VALUES (:toolId, :idToolRevisionTypes);`,
      data
    );
  }
};

const itemFunction = {
  removeAllOld: toolId => {
    return execQuery(`DELETE FROM tool_item WHERE id_tool = ?;`, [toolId]);
  },
  add: async (data, type = 0) => {
    const number = data.number || data.count;
    if (number > 0) {
      if (data.warehouse) {
        data.warehouseJSON = JSON.stringify(data.warehouse);
        data.warehouseId = data.warehouse.id;
      }
      // tohle by chtělo vyseknout do service a nejůépe na to udělat modul stock
      const exist = await itemFunction.getItem(data.toolId, data.warehouseId);
      if (exist.length === 0 && type === 0) {
        data.inStock = number;
        data.count = number;
        await execQuery(
          `INSERT INTO tool_item (id_tool, inStock, warehouse, warehouseId, count, inService, place) VALUES (:toolId, :inStock, :warehouseJSON, :warehouseId, :count, :inService, :place);`,
          data
        );
      } else if (exist.length > 0) {
        const firstExist = nth(0, exist);
        if (type === 0) {
          firstExist.count = aliasAdd(number, firstExist.count);
          firstExist.inStock = aliasAdd(number, firstExist.inStock);
        } else if (type === 1) {
          firstExist.inStock = aliasAdd(number, firstExist.inStock);
        } else if (type === 2) {
          firstExist.inStock = subtract(firstExist.inStock, number);
        } else if (type === 3) {
          firstExist.count = subtract(firstExist.count, number);
          firstExist.inStock = subtract(firstExist.inStock, number);
        }
        await itemFunction.update(firstExist);
      }
      const items = await itemFunction.allById(data.toolId);

      await execQuery(
        `UPDATE ${tableName} SET items=:items WHERE id = :toolId;`,
        { items: JSON.stringify(items), toolId: data.toolId }
      );
    }
    return true;
  },
  update: data => {
    data.toolId = data.toolId || data["id_tool"];
    return execQuery(
      `UPDATE tool_item
      SET inStock=:inStock, count=:count
      WHERE id_tool = :toolId AND warehouseId = :warehouseId;`,
      data
    );
  },
  getItem: (toolId, warehouseId) => {
    return execQuery(
      `SELECT * FROM tool_item WHERE id_tool = ? AND warehouseId = ?;`,
      [toolId, warehouseId]
    );
  },
  allById: toolId => {
    return execQuery(`SELECT * FROM tool_item WHERE id_tool = ?;`, [toolId]);
  }
};

const stockFunction = {
  createRecord: async data => {
    data.itemsJSON = data.items ? JSON.stringify(data.items) : "[]";
    data.exporterN = data.exporter ? 1 : 0;
    await execQuery(
      `INSERT INTO move_stock (type, exporter, items, createdAt) VALUES (:type, :exporterN, :itemsJSON, NOW());`,
      data
    );
    map(x => {
      return itemFunction.add(x, data.type);
    }, data.items);
  },
  list: () => execQuery(`SELECT * FROM move_stock ORDER BY createdAt DESC;`),
  showById: id => execQuery(`SELECT * FROM move_stock WHERE id = ?;`, [id]),
  returnedAll: async id => {
    const item = nth(0, await stockFunction.showById(id));
    const flipSubtract = flip(subtract);
    map(x => {
      itemFunction.add(
        over(lensProp("count"), flipSubtract(x.returned || 0), x),
        1
      );
    }, toJson(item.items));
    const items = map(
      x => ({
        ...x,
        returned: x.number || x.count
      }),
      toJson(item.items)
    );
    execQuery(
      `UPDATE move_stock
      SET items=:items
      WHERE id = :id;`,
      { items: JSON.stringify(items), id }
    );
  }
};

function list(query) {
  const builder = new queryBuilder();
  const filter = query.filter ? JSON.parse(query.filter) : {};
  builder.columns(`${tableName}.*`);
  builder.from(tableName).groupBy(`${tableName}.id`);
  //.limit(500);

  if (!filter.deletedAt) {
    builder.where(`${tableName}.deletedAt IS NULL`);
  } else {
    builder.where(`${tableName}.deletedAt IS NOT NULL`);
  }
  if (query.sortBy) {
    builder.orderBy(`${tableName}.${query.sortBy}`, query.descending);
  }
  if (filter.categories && filter.categories.length) {
    builder.join("tool_category", `tc.id_tool = ${tableName}.id`, "tc");
    builder.where(
      `tc.id_category IN(${filter.categories
        .map(x => parseInt(x))
        .filter(x => x > 0)
        .join(",")})`
    );
  }
  if (filter.revisionTypes && filter.revisionTypes.length) {
    builder.join("tool_revision_type", `trt.id_tool = ${tableName}.id`, "trt");
    builder.where(
      `trt.id_tool_revision_types IN(${filter.revisionTypes
        .map(x => parseInt(x))
        .filter(x => x > 0)
        .join(",")})`
    );
  }
  if (filter.warehouse && filter.warehouse.length) {
    builder.join("tool_item", `ti.id_tool = ${tableName}.id`, "ti");
    builder.where(
      `ti.warehouseId IN(${filter.warehouse
        .map(x => parseInt(x))
        .filter(x => x > 0)
        .join(",")})`
    );
  }
  if (filter.employee && filter.employee.length) {
    builder.join("tool_item", `ti2.id_tool = ${tableName}.id`, "ti2");
    builder.join("warehouse", `wh2.id = ti2.warehouseId`, "wh2");
    builder.where(
      `wh2.accountableEmployeeId IN(${filter.employee
        .map(x => parseInt(x))
        .filter(x => x > 0)
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

function revertById(toolId) {
  return execQuery(`UPDATE ${tableName} SET deletedAt=NULL WHERE id = ?;`, [
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
  updateRevisions: revisionFunction.update,
  deleteById,
  revertById,
  listCategories: categoriesFunction.list,
  addCategories: categoriesFunction.add,
  addRevisionType: revisionFunction.addType,
  updateRevisionType: revisionFunction.updateType,
  listRevisionType: revisionFunction.list,
  listUpcomingRevisions: revisionFunction.listUpcomingRevisions,
  deleteRevisionType: revisionFunction.deleteRevisionType,
  moveRecord: stockFunction.createRecord,
  listMove: stockFunction.list,
  returnedAllTools: stockFunction.returnedAll
};
