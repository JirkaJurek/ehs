"use strict";

const combineRouters = require("koa-combine-routers");
const KoaRouter = require("koa-router");
const jwtToken = require("jsonwebtoken");

const toolsRouter = require("./tools");
const usersRouter = require("./users");
const filesRouter = require("./files");
const configRouter = require("./config");
const warehouseRouter = require("./warehouse");
const taskRouter = require("./task");

const basicRouter = KoaRouter();
basicRouter.post("/login", async (ctx, next) => {
  const { password } = ctx.request.body;
  if (password === "rijmxvJ1") {
    ctx.body = {
      basicToken: jwtToken.sign({ foo: "bar" }, "shhhhh")
    };
  }
  ctx.status = 200;
});

const router = combineRouters(
  toolsRouter,
  usersRouter,
  filesRouter,
  configRouter,
  warehouseRouter,
  taskRouter,
  basicRouter
);

module.exports = router;
