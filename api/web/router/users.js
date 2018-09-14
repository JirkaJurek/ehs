'use strict'

const Router = require('koa-router');
const router = new Router({
    prefix: '/users'
  });

router.get('/', async (ctx, next) => {
    ctx.body = 'Hello'
})

module.exports = router