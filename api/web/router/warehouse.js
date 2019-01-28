"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/warehouse"
});

const { warehouse } = require("../../modules");
const { head } = require("ramda");

router.get("/", async (ctx, next) => {
  ctx.body = await warehouse.service.list();
});
router.get("/:id(\\d+)", async (ctx, next) => {
  const item = await warehouse.service.showById(ctx.params.id);
  ctx.body = head(item);
});
router.post("/", async (ctx, next) => {
  await warehouse.service.add(ctx.request.body);
  ctx.status = 200;
});
router.post("/:id(\\d+)", async (ctx, next) => {
  await warehouse.service.update(ctx.params.id, ctx.request.body);
  ctx.status = 200;
});
router.delete("/:id(\\d+)", async (ctx, next) => {
  warehouse.service.delete(ctx.params.id);
  ctx.status = 200;
});

module.exports = router;
