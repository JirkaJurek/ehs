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
router.get("/permissions", async (ctx, next) => {
  ctx.body = await users.service.userPermissions();
});
router.post("/", async (ctx, next) => {
  users.service.add(ctx.request.body);
  ctx.status = 200;
});
router.get("/:id(\\d+)/permission", async (ctx, next) => {
  ctx.body = await users.service.userPermission(ctx.params.id);
});
router.post("/:id(\\d+)/permission", async (ctx, next) => {
  await users.service.addUserPermission(ctx.params.id, ctx.request.body);
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
router.get("/:id(\\d+)", async (ctx, next) => {
  const item = await users.service.showById(ctx.params.id);
  ctx.body = head(item);
});

module.exports = router;
