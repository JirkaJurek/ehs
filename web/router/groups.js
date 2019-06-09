"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/groups"
});

const { groups: mainModule } = require("../../modules");
const { head } = require("ramda");

router.get("/", async (ctx, next) => {
  ctx.body = (await mainModule.service.list(ctx.request.query)).rows;
});
router.get("/:id(\\d+)", async (ctx, next) => {
  const item = await mainModule.service.showById(ctx.params.id);
  ctx.body = head(item.rows);
});
router.post("/", async (ctx, next) => {
  await mainModule.service.add(ctx.request.body);
  ctx.status = 200;
});
router.post("/:id(\\d+)", async (ctx, next) => {
  await mainModule.service.update(
    ctx.params.id,
    ctx.request.body
  );
  ctx.status = 200;
});
router.delete("/:id(\\d+)", async (ctx, next) => {
  await mainModule.service.delete(ctx.params.id);
  ctx.status = 200;
});

module.exports = router;
