"use strict";

const { files } = require("../../modules");
const Router = require("koa-router");

const router = new Router({
  prefix: "/files"
});

router.get("/", async (ctx, next) => {
  ctx.body = await files.service.list();
});

router.post("/", async (ctx, next) => {
  ctx.body = await files.service.upload(ctx.request.body["files[]"]);
  ctx.status = 200;
});

router.put("/", async (ctx, next) => {
  console.log(ctx.request.body);
});

module.exports = router;
