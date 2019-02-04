const { execQuery } = require("../db");
const jwtToken = require("jsonwebtoken");

const Log = options => async (ctx, next) => {
  if (
    ["POST", "PUT", "DELETE"].indexOf(ctx.request.method) !== -1 &&
    ctx.request.url !== "/permissions" &&
    ctx.request.url !== "/login"
  ) {
    const data = jwtToken.verify(
      ctx.header.authorization.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    execQuery(
      "INSERT INTO `log` (`sql`, `values`, userId, type) VALUES (:str, :values, :userId, :type);",
      {
        str: JSON.stringify({
          method: ctx.request.method,
          url: ctx.request.url,
          body: ctx.request.body,
          query: ctx.request.query
        }),
        values: null,
        userId: data.id,
        type: "userLog"
      },
      null,
      null,
      true
    );
  }
  return next();
};

module.exports = Log;
