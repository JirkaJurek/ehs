"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/languages"
});

const { languages } = require("../../modules");
const { head } = require("ramda");

router.get("/", async (ctx, next) => {
  ctx.body = (await languages.service.list(ctx.request.query)).rows;
});
router.get("/:id(\\d+)", async (ctx, next) => {
  const item = await languages.service.showById(ctx.params.id);
  ctx.body = head(item.rows);
});
router.post("/", async (ctx, next) => {
  await languages.service.add(ctx.request.body);
  ctx.status = 200;
});
router.post("/:id(\\d+)", async (ctx, next) => {
  await languages.service.update(
    ctx.params.id,
    ctx.request.body
  );
  ctx.status = 200;
});
router.delete("/:id(\\d+)", async (ctx, next) => {
  await languages.service.delete(ctx.params.id);
  ctx.status = 200;
});

module.exports = router;
