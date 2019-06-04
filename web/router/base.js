"use strict";

const jwtToken = require("jsonwebtoken");
const Router = require("koa-router");
const router = new Router();

const { users, forms, sections, questions } = require("../../modules");
const { head } = require("ramda");

/*
router.post("/login", async (ctx, next) => {
  // const { password } = ctx.request.body;
  //
  // if (password === "rijmxvJ1") {
  //   ctx.body = {
  //     basicToken: jwtToken.sign(
  //       { userId: 1, name: "test", permissions: [{ name: "test" }] },
  //       process.env.JWT_SECRET
  //     )
  //   };
  // }
  ctx.body = await users.service.login(ctx.request.body);
  ctx.status = 200;
});

router.post("/permissions", async (ctx, next) => {
  const data = jwtToken.verify(
    ctx.header.authorization.replace("Bearer ", ""),
    process.env.JWT_SECRET
  );

  if (await users.service.isActive(data.id)) {
    // dodělat hash oprávnění
    const [user, permissions] = await Promise.all([
      users.service.showById(data.id),
      users.service.userPermissionDetail(data.id)
    ]);

    ctx.body = {
      user: head(user),
      status: true,
      permissions
    };
    ctx.status = 200;
  } else {
    ctx.body = {
      status: false
    };
  }
});
*/

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
    return { ...form, sections:  await Promise.all(sectionsData) };
  });

  ctx.status = 200;
  ctx.body = await Promise.all(allForms);
});

module.exports = router;
