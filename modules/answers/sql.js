"use strict";

const { execQuery, queryBuilder } = require("../db");
const tableName = "answers";

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

const transformData = data => {
  return data;
};

async function add(data) {
  data = transformData(data);

  return execQuery(
    `INSERT INTO ${tableName} (date, location, technician, customer) VALUES ($1, $2, $3, $4) RETURNING id;`,
    [data.date, data.location, data.technician, data.customer]
  );
}

function update(id, data) {
  data = transformData(data);
  data.id = id;
  const task = execQuery(
    `UPDATE ${tableName} 
        SET name=$1,
        description=$2,
        index=$3,
        form_id=$5
        WHERE id=$4;`,
    [data.name, data.description, data.index, data.id, data.form_id]
  );
  return task;
}

function list(query) {
  const builder = new queryBuilder();
  const filter = query.filter ? toJson(query.filter) : {};
  builder.from(tableName);
  builder.orderBy(`${tableName}.id`, "true");
  return execQuery(builder.getSql());
}

function showById(id) {
  return execQuery(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
}

function deleteById(toolId) {
  return execQuery(`UPDATE ${tableName} SET active=false WHERE id = $1;`, [
    toolId
  ]);
}

const questionsAnswer = {
  add: async data => {
    return execQuery(
      `INSERT INTO question_answer (answer_id, question_id, answer) VALUES ($1, $2, $3);`,
      [data.answer_id, data.question_id, data.answer]
    );
  },
  list: async query => {
    const builder = new queryBuilder();
    const filter = query.filter ? toJson(query.filter) : {};
    builder
      .from("question_answer")
      .columns(
        `question_answer.*, que.text AS question_text, que.index AS question_index, sec.index AS section_index`
      )
      .join("questions", `question_answer.question_id = que.id`, "que")
      .join("sections", `que.section_id = sec.id`, "sec");
    if (filter.answerIds && filter.answerIds.length) {
      builder.where(`answer_id IN('${filter.answerIds.join("','")}')`);
    }
    return execQuery(builder.getSql());
  }
};

const findings = {
  add: async data => {
    return execQuery(
      `INSERT INTO findings (answer_id, question_id, due_date, root_cause, corrective_actions) VALUES ($1, $2, $3, $4, $5);`,
      [
        data.answer_id,
        data.question_id,
        data.due_date,
        data.root_cause,
        data.corrective_actions
      ]
    );
  },
  list: async query => {
    const builder = new queryBuilder();
    const filter = query.filter ? toJson(query.filter) : {};
    builder.from("findings");
    if (filter.answerIds && filter.answerIds.length) {
      builder.where(`answer_id IN('${filter.answerIds.join("','")}')`);
    }
    return execQuery(builder.getSql());
  }
};

module.exports = {
  add,
  update,
  list,
  showById,
  deleteById,
  questionsAnswer,
  findings
};
