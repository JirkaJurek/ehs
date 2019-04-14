"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/address-book"
});

const { addressBook } = require("../../modules");
const { mobileTariffs } = addressBook;
const { head } = require("ramda");

router.get("/mobile-tariffs", async (ctx, next) => {
  ctx.body = await mobileTariffs.service.list();
});
router.post("/mobile-tariffs", async (ctx, next) => {
  await mobileTariffs.service.add(ctx.request.body);
  ctx.status = 200;
});
router.post("/mobile-tariffs/:id(\\d+)", async (ctx, next) => {
  await mobileTariffs.service.update(ctx.params.id, ctx.request.body);
  ctx.status = 200;
});
router.delete("/mobile-tariffs/:id(\\d+)", async (ctx, next) => {
  await mobileTariffs.service.delete(ctx.params.id);
  ctx.status = 200;
});
router.get("/mobile-tariffs/:id(\\d+)", async (ctx, next) => {
  const item = await mobileTariffs.service.showById(ctx.params.id);
  ctx.body = head(item);
});

module.exports = router;
