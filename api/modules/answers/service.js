"use strict";

const sql = require("./sql");
const { mapObjIndexed, values, pipe, map } = require("ramda");

const toJson = data => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

module.exports.add = async data => {
  const newAnswer = (await sql.add(data)).rows[0];
  const findings = [];
  const questionsAnswerPromise = pipe(
    mapObjIndexed((answer, question_id) => {
      if (answer === "No" && data.findings[question_id]) {
        findings.push({
          ...data.findings[question_id],
          question_id
        });
      }
      return sql.questionsAnswer.add({
        answer,
        answer_id: newAnswer.id,
        question_id
      });
    }),
    values,
    promises => Promise.all(promises)
  )(data.questions);
  const findingsPromise = pipe(
    map(finding => sql.findings.add({ ...finding, answer_id: newAnswer.id })),
    values,
    promises => Promise.all(promises)
  )(findings);
  console.log(data.findings);
  return { newAnswer, findingsPromise, questionsAnswerPromise };
};

module.exports.update = (id, data) => {
  return sql.update(id, data);
};

module.exports.showDetailById = async id => {
  const answer = (await sql.showById(id)).rows[0];
  const [questions, findings] = await Promise.all([
    sql.questionsAnswer.list({
      filter: { answerIds: [answer.id] }
    }),
    sql.findings.list({
      filter: { answerIds: [answer.id] }
    })
  ]);
  return {
    ...answer,
    questions: questions.rows,
    findings: findings.rows
  };
};
module.exports.showById = id => {
  return sql.showById(id);
};

module.exports.list = async query => {
  return sql.list(query);
};

module.exports.delete = id => {
  return sql.deleteById(id);
};
