"use strict";

const combineRouters = require("koa-combine-routers");

const usersRouter = require("./users");
const baseRouter = require("./base");
const questions = require("./questions");
const sections = require("./sections");
const forms = require("./forms");
const languages = require("./languages");
const translations = require("./translations");
const answers = require("./answers");

const router = combineRouters(
  usersRouter,
  // je potřeba k oprávnění
  baseRouter,
  questions,
  sections,
  forms,
  languages,
  translations,
  answers,
);

module.exports = router;
