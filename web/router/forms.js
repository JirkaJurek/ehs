"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/forms"
});

const { forms } = require("../../modules");
const { head } = require("ramda");

router.get("/", async (ctx, next) => {
  ctx.body = (await forms.service.list(ctx.request.query)).rows;
});
router.get("/:id(\\d+)", async (ctx, next) => {
  const item = await forms.service.showById(ctx.params.id);
  ctx.body = head(item.rows);
});
router.get("/:id(\\d+)/data", async (ctx, next) => {
  ctx.body = await forms.service.data(ctx.params.id, ctx.request.query);
});
router.post("/", async (ctx, next) => {
  await forms.service.add(ctx.request.body);
  ctx.status = 200;
});
router.post("/:id(\\d+)", async (ctx, next) => {
  await forms.service.update(
    ctx.params.id,
    ctx.request.body
  );
  ctx.status = 200;
});
router.delete("/:id(\\d+)", async (ctx, next) => {
  await forms.service.delete(ctx.params.id);
  ctx.status = 200;
});
router.post("/:id(\\d+)/data", async (ctx, next) => {
  await forms.service.saveData(
    ctx.params.id,
    ctx.request.body
  );
  ctx.status = 200;
});

module.exports = router;
