"use strict";

const jwtToken = require("jsonwebtoken");
const Router = require("koa-router");
const router = new Router();

const { users, forms, sections, questions, groups } = require("../../modules");
const { head } = require("ramda");

const fs = require("fs");
const path = require("path");
const util = require("util");

const readFile = util.promisify(fs.readFile);

router.get("/login", async (ctx, next) => {
  ctx.set("Content-Type", "text/html");
  ctx.body = await readFile(
    path.join(__dirname, "../public/login.html")
  );
});

router.post("/login", async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = await users.service.login(ctx.request.body);
  ctx.status = 200;
});

router.post("/permissions", async (ctx, next) => {
  if (ctx.header.authorization) {
    const data = jwtToken.verify(
      ctx.header.authorization.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    if (await users.service.isActive(data.id)) {
      // dodělat hash oprávnění
      const [user, permissions] = await Promise.all([
        users.service.showById(data.id),
        groups.service.permissionsByUserId(data.id)
      ]);

      ctx.body = {
        user: head(user),
        status: true,
        permissions: permissions
      };
      ctx.status = 200;
      return ctx;
    }
  }
  ctx.body = {
    status: false
  };
});

router.get("/data", async (ctx, next) => {
  const allForms = (await forms.service.list({})).rows.map(async form => {
    const sectionsData = (await sections.service.list({
      filter: { formIds: [form.id] }
    })).rows.map(async section => {
      const questionsData = (await questions.service.list({
        filter: { sectionIds: [section.id] }
      })).rows;
      return { ...section, questions: questionsData };
    });
    return { ...form, sections: await Promise.all(sectionsData) };
  });

  ctx.status = 200;
  ctx.body = await Promise.all(allForms);
});

router.get("/admin/*", async (ctx, next) => {
  ctx.set("Content-Type", "text/html");
  ctx.body = await readFile(
    path.join(__dirname, "../public/frontend-dist/index.html")
  );
});
router.get("/admin", async (ctx, next) => {
  ctx.set("Content-Type", "text/html");
  ctx.body = await readFile(
    path.join(__dirname, "../public/frontend-dist/index.html")
  );
});
router.get(["/public/*", "/public"], async (ctx, next) => {
  ctx.set("Content-Type", "text/html");
  ctx.body = await readFile(
    path.join(__dirname, "../public/public-dist/index.html")
  );
});

module.exports = router;
