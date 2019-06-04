"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/questions"
});

const { questions } = require("../../modules");
const { head } = require("ramda");

router.get("/", async (ctx, next) => {
  ctx.body = (await questions.service.list(ctx.request.query)).rows;
});
router.get("/:id(\\d+)", async (ctx, next) => {
  const item = await questions.service.showById(ctx.params.id);
  ctx.body = head(item.rows);
});
router.post("/", async (ctx, next) => {
  await questions.service.add(ctx.request.body);
  ctx.status = 200;
});
router.post("/:id(\\d+)", async (ctx, next) => {
  await questions.service.update(
    ctx.params.id,
    ctx.request.body
  );
  ctx.status = 200;
});
router.delete("/:id(\\d+)", async (ctx, next) => {
  await questions.service.delete(ctx.params.id);
  ctx.status = 200;
});

module.exports = router;
