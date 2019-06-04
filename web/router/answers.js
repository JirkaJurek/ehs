"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/answers"
});

const { answers } = require("../../modules");
const { head } = require("ramda");

router.get("/", async (ctx, next) => {
  ctx.body = (await answers.service.list(ctx.request.query)).rows;
});
router.get("/:id(\\d+)", async (ctx, next) => {
  const item = await answers.service.showById(ctx.params.id);
  ctx.body = head(item.rows);
});
router.get("/:id(\\d+)/detail", async (ctx, next) => {
  ctx.body = await answers.service.showDetailById(ctx.params.id);
});
router.post("/", async (ctx, next) => {
  await answers.service.add(ctx.request.body);
  ctx.status = 200;
});
router.post("/:id(\\d+)", async (ctx, next) => {
  await answers.service.update(ctx.params.id, ctx.request.body);
  ctx.status = 200;
});
router.delete("/:id(\\d+)", async (ctx, next) => {
  await answers.service.delete(ctx.params.id);
  ctx.status = 200;
});

module.exports = router;
