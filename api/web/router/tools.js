'use strict'

const Router = require('koa-router');
const router = new Router({
    prefix: '/tools'
});
const validate = require('koa2-validation');


const { tools } = require('../../modules');

router.get('/', async (ctx, next) => {
    //tools.service.testConnection();
    ctx.body = await tools.service.list();
})
router.post('/', validate(tools.validate.postAddTool) , async (ctx, next) => {
    //const { file, name2 } = ctx.request.body;
    tools.service.add(ctx.request.body)
    ctx.body = 'Hello'
})

module.exports = router