"use strict";

const sql = require("./sql");
const { head } = require("ramda");
const moduleUsers = require("../users");
const moment = require("moment");

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

module.exports.add = data => {
  return sql.add(data);
};

module.exports.update = async (id, data) => {
  const task = head(await sql.showById(id));
  const lastFulfillment = head(toJson(task.taskFulfillment));
  const lastDone = lastFulfillment ? lastFulfillment.done : 0;
  // currentUser změnit na aktuálně přihlášeného uživatele
  const currentUser = head(await moduleUsers.service.showById(1));
  let promiseArray = [];
  const setFulfillment = description => {
    promiseArray.push(
      sql.fulfillmentAdd(id, {
        user: currentUser,
        description,
        done: lastDone
      })
    );
  };
  if (task.resolverId != data.resolver.id) {
    const newResolver = head(
      await moduleUsers.service.showById(data.resolver.id)
    );
    setFulfillment(
      `Změna řešitele z "${moduleUsers.service.getUserName(
        toJson(task.resolver)
      )}" na "${moduleUsers.service.getUserName(newResolver)}".`
    );
  }

  if (task.name != data.name) {
    setFulfillment(`Změna názvu z "${task.name}" na "${data.name}".`);
  }
  if (task.presumedEnd != data.presumedEnd) {
    setFulfillment(
      `Změna předpokladaného termínu dokončení z "${moment(
        task.presumedEnd
      ).format("D.M.YYYY")}" na "${moment(data.presumedEnd).format(
        "D.M.YYYY"
      )}".`
    );
  }
  if (task.type != data.type) {
    setFulfillment(`Změna oblasti vedení z "${task.type}" na "${data.type}".`);
  }
  await Promise.all(promiseArray);
  const refreshedTask = head(await sql.showById(id));
  return sql.update(id, {
    ...data,
    taskFulfillment: toJson(refreshedTask.taskFulfillment)
  });
};

module.exports.showById = id => {
  return sql.showById(id);
};

module.exports.list = query => {
  return sql.list(query);
};

module.exports.change = async (id, data) => {
  if (data.type == "done") {
    // user změnit na aktuálně přihlášeného uživatele
    const user = head(await moduleUsers.service.showById(1));
    return sql.fulfillmentAdd(id, {
      user,
      description: "Úkol je vyřešen",
      done: 100
    });
  }
};

module.exports.delete = id => {
  return sql.deleteById(id);
};

module.exports.fulfillmentAdd = async (id, data) => {
  const task = head(await sql.showById(id));
  let description = "";
  if (task.resolverId != data.resolver.id) {
    description += `Změna řešitele z "${moduleUsers.service.getUserName(
      toJson(task.resolver)
    )}" na "${moduleUsers.service.getUserName(data.resolver)}".`;
    task.resolver = data.resolver;
  }
  if (task.presumedEnd != data.presumedEnd) {
    description = `Změna předpokladaného termínu dokončení z "${moment(
      task.presumedEnd
    ).format("D.M.YYYY")}" na "${moment(data.presumedEnd).format(
      "D.M.YYYY"
    )}".`;
    task.presumedEnd = data.presumedEnd;
  }
  if (description != "") {
    await sql.update(id, task);
  }
  data.description = description + data.description;
  return sql.fulfillmentAdd(id, data);
};
