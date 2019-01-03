"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/task"
});

const { task } = require("../../modules");
const { head } = require("ramda");

router.get("/", async (ctx, next) => {
  ctx.body = await task.service.list();
});
router.get("/:id(\\d+)", async (ctx, next) => {
  const item = await task.service.showById(ctx.params.id);
  ctx.body = head(item);
});
router.post("/", async (ctx, next) => {
  await task.service.add(ctx.request.body);
  ctx.status = 200;
});
router.post("/:id(\\d+)", async (ctx, next) => {
  await task.service.update(ctx.params.id, ctx.request.body);
  ctx.status = 200;
});
router.post("/:id(\\d+)/fulfillment", async (ctx, next) => {
  await task.service.fulfillmentAdd(ctx.params.id, ctx.request.body);
  ctx.status = 200;
});
router.post("/:id(\\d+)/change", async (ctx, next) => {
  await task.service.change(ctx.params.id, ctx.request.body);
  ctx.status = 200;
});
router.delete("/:id(\\d+)", async (ctx, next) => {
  task.service.delete(ctx.params.id);
  ctx.status = 200;
});

module.exports = router;
