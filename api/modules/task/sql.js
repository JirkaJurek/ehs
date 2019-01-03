"use strict";

const { execQuery, escape, queryBuilder } = require("../db");
const moduleUsers = require("../users");
const { head, is } = require("ramda");
const tableName = "task";
const moment = require("moment");

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

const transformData = data => {
  if (data.submitter) {
    if (is(String, data.submitter)) {
      data.submitter = toJson(data.submitter);
    }
    data.submitterJSON = JSON.stringify(data.submitter);
    data.submitterId = data.submitter.id;
  }
  if (data.resolver) {
    if (is(String, data.resolver)) {
      data.resolver = toJson(data.resolver);
    }
    data.resolverJSON = JSON.stringify(data.resolver);
    data.resolverId = data.resolver.id;
  }
  if (data.taskFulfillment) {
    if (is(String, data.taskFulfillment)) {
      data.taskFulfillment = toJson(data.taskFulfillment);
    }
    data.taskFulfillmentJSON = JSON.stringify(data.taskFulfillment);
  }
  return data;
};

async function add(data) {
  data = transformData(data);
  data.number = `${moment(new Date()).format("YY")}-${(
    "000" +
    (Number((await thisYear()).info.numRows) + 1)
  ).substr(-4)}`;
  const task = execQuery(
    `INSERT INTO ${tableName} (submitter, submitterId, resolver, resolverId, type, name, presumedEnd, taskFulfillment, number) VALUES (:submitterJSON, :submitterId, :resolverJSON, :resolverId, :type, :name, :presumedEnd, '[]', :number);`,
    data
  );
  return task;
}

function update(id, data) {
  data = transformData(data);
  data.id = id;
  const task = execQuery(
    `UPDATE ${tableName} 
        SET submitter=:submitterJSON, submitterId=:submitterId, resolver=:resolverJSON, resolverId=:resolverId, type=:type, name=:name, presumedEnd=:presumedEnd, taskFulfillment=:taskFulfillmentJSON, doneAt=:doneAt
        WHERE id=:id;`,
    data
  );
  return task;
}

const thisYear = () => {
  return execQuery(
    `SELECT * FROM ${tableName} WHERE YEAR(dateOfEntry) = YEAR(CURDATE())`
  );
};

function list(query) {
  const builder = new queryBuilder();
  builder.from(tableName).groupBy(`${tableName}.id`);
  builder.where("deletedAt IS NULL");
  builder.orderBy(`${tableName}.id`, "true");
  return execQuery(builder.getSql());
}

function showById(id) {
  return execQuery(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
}

function deleteById(toolId) {
  // k name přidat (smazáno) a všude kde je použit to updatnout
  return execQuery(`UPDATE ${tableName} SET deletedAt=NOW() WHERE id = ?;`, [
    toolId
  ]);
}

const updateLinkedData = async taskId => {
  const task = head(await showById(taskId));
  const [taskFulfillment, submitter, resolver] = await Promise.all([
    fulfillmentFunction.loadAllByTaskId(taskId),
    moduleUsers.service.showById(parseInt(task.submitterId)),
    moduleUsers.service.showById(parseInt(task.resolverId))
  ]);

  const lastFulfillment = head(taskFulfillment);
  const doneAt = lastFulfillment.done == 100 ? lastFulfillment.createdAt : null;
  return update(taskId, {
    ...task,
    doneAt,
    taskFulfillment,
    submitter: head(submitter),
    resolver: head(resolver)
  });
};

const fulfillmentFunction = {
  add: async (taskId, data) => {
    data.userJSON = JSON.stringify(data.user);
    data.userId = data.user.id;
    data.taskId = taskId;
    const fulfillment = await execQuery(
      `INSERT INTO task_fulfillment (taskId, userId, user, description, done) VALUES (:taskId, :userId, :userJSON, :description, :done);`,
      data
    );
    await updateLinkedData(taskId);
    return fulfillment;
  },
  loadAllByTaskId: async id =>
    execQuery(
      `SELECT * FROM task_fulfillment WHERE taskId = ? ORDER BY createdAt DESC;`,
      [id]
    )
};

module.exports = {
  add,
  update,
  list,
  showById,
  deleteById,
  fulfillmentAdd: fulfillmentFunction.add
};
