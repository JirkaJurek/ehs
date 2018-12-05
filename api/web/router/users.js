"use strict";

const Router = require("koa-router");
const router = new Router({
  prefix: "/users"
});

const { users } = require("../../modules");
const { head } = require("ramda");

router.get("/", async (ctx, next) => {
  ctx.body = await users.service.list();
});
router.get("/:id(\\d+)", async (ctx, next) => {
  const item = await users.service.showById(ctx.params.id);
  ctx.body = head(item);
});
router.post("/", async (ctx, next) => {
  users.service.add(ctx.request.body);
  ctx.status = 200;
});
router.post("/:id(\\d+)", async (ctx, next) => {
  users.service.update(ctx.params.id, ctx.request.body);
  ctx.status = 200;
});
router.delete("/:id(\\d+)", async (ctx, next) => {
  users.service.delete(ctx.params.id);
  ctx.status = 200;
});

module.exports = router;
