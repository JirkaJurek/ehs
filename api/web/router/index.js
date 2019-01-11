"use strict";

const combineRouters = require("koa-combine-routers");
const KoaRouter = require("koa-router");

const toolsRouter = require("./tools");
const usersRouter = require("./users");
const filesRouter = require("./files");
const configRouter = require("./config");
const warehouseRouter = require("./warehouse");
const taskRouter = require("./task");
const baseRouter = require("./base");

const router = combineRouters(
  toolsRouter,
  usersRouter,
  filesRouter,
  configRouter,
  warehouseRouter,
  taskRouter,
  baseRouter
);

module.exports = router;
