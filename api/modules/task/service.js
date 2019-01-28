"use strict";

const sql = require("./sql");
const { head, find, propEq } = require("ramda");
const moduleUsers = require("../users");
const moment = require("moment");
const jwtToken = require("jsonwebtoken");

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

module.exports.add = (data, authorization) => {
  const submitter = jwtToken.verify(
    authorization.replace("Bearer ", ""),
    process.env.JWT_SECRET
  );
  return sql.add({ ...data, submitter });
};

module.exports.update = async (id, data, authorization) => {
  const task = head(await sql.showById(id));
  const lastFulfillment = head(toJson(task.taskFulfillment));
  const lastDone = lastFulfillment ? lastFulfillment.done : 0;
  const currentUser = jwtToken.verify(
    authorization.replace("Bearer ", ""),
    process.env.JWT_SECRET
  );
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

module.exports.list = async (query, authorization) => {
  const currentUser = jwtToken.verify(
    authorization.replace("Bearer ", ""),
    process.env.JWT_SECRET
  );
  // předělat na komplexnější ACL
  const permissions = await moduleUsers.service.userPermissionDetail(
    currentUser.id
  );
  const allTasksUnique = find(propEq("action", "AllTasksUnique"), permissions);
  let defaultFilter = { resolver: [currentUser.id], submitter: [currentUser.id] };
  if (allTasksUnique && allTasksUnique.config === null) {
    defaultFilter = {};
  } else if (allTasksUnique) {
    const config = toJson(allTasksUnique.config);
    if (config.watching) {
      config.watching.forEach(element => {
        defaultFilter.resolver.push(element);
        defaultFilter.submitter.push(element);
      });
    }
  }
  return sql.list(query, defaultFilter);
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

module.exports.fulfillmentAdd = async (id, data, authorization) => {
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
  const currentUser = jwtToken.verify(
    authorization.replace("Bearer ", ""),
    process.env.JWT_SECRET
  );
  return sql.fulfillmentAdd(id, { ...data, user: currentUser });
};
