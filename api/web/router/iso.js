"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/iso"
});

const { iso } = require("../../modules");
const { head } = require("ramda");

router.get("/", async (ctx, next) => {
  ctx.body = await iso.service.list(ctx.request.query);
});
router.get("/:id(\\d+)", async (ctx, next) => {
  const item = await iso.service.showById(ctx.params.id);
  ctx.body = head(item);
});
router.post("/", async (ctx, next) => {
  await iso.service.add(ctx.request.body);
  ctx.status = 200;
});
router.post("/:id(\\d+)", async (ctx, next) => {
  await iso.service.update(ctx.params.id, ctx.request.body);
  ctx.status = 200;
});
router.delete("/:id(\\d+)", async (ctx, next) => {
  await iso.service.delete(ctx.params.id);
  ctx.status = 200;
});
router.get("/:id(\\d+)/revisions", async (ctx, next) => {
  ctx.body = await iso.service.revisionsById(ctx.params.id);
});
router.post("/:id(\\d+)/revision", async (ctx, next) => {
  await iso.service.addRevision(ctx.params.id, ctx.request.body);
  ctx.status = 200;
});

module.exports = router;
