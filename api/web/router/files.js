'use strict'

const Router = require('koa-router');
const router = new Router({
    prefix: '/files'
});

router.get('/', async (ctx, next) => {
    ctx.body = 'Hello'
})

router.post('/', async (ctx, next) => {
    console.log(ctx.request.body)
})

router.put('/', async (ctx, next) => {
    console.log(ctx.request.body)
})

module.exports = router