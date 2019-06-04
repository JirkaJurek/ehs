"use strict";

const sql = require("./sql");
const moduleSection = require("../sections");
const moduleQuestions = require("../questions");
const moduleTranslations = require("../translations");
const moduleAnswers = require("../answers");

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

module.exports.update = (id, data) => {
  return sql.update(id, data);
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

module.exports.data = async (id, {hl = "en"}) => {
  const translations = (await moduleTranslations.service.list({
    filter: { langs: [hl] }
  })).rows.reduce((acc, item) => {
    return {
      ...acc,
      [item.name]: item.value
    };
  }, {});
  return await Promise.all(
    (await moduleSection.service.list({
      filter: { formIds: [id] }
    })).rows.map(async section => {
      const questionsData = (await moduleQuestions.service.list({
        filter: { sectionIds: [section.id] }
      })).rows.map(item => {
        return {
          ...item,
          text: translations[`question[${item.id}].text`] || item.text
        };
      });
      return {
        ...section,
        name: translations[`section[${section.id}].name`] || section.name,
        description:
          translations[`section[${section.id}].description`] ||
          section.description,
        questions: questionsData
      };
    })
  );
};

module.exports.saveData = (id, data) => {
  console.log(moduleAnswers.service.add({...data, form_id: id}))
};
