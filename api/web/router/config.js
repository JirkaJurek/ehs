"use strict";

const { config } = require('../../modules');
const Router = require("koa-router");

const router = new Router({
  prefix: "/config"
});

router.get("/", async (ctx, next) => {
  ctx.body = await config.service.list(ctx.request.query);
});

router.post("/edit-by-name", async (ctx, next) => {
  config.service.editByName(ctx.request.body);
  ctx.status = 200;
});

module.exports = router;
