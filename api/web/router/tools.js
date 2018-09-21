'use strict'

const Router = require('koa-router');
const router = new Router({
    prefix: '/tools'
});
const validate = require('koa2-validation');
const { head } = require('ramda');


const { tools } = require('../../modules');

router.get('/', async (ctx, next) => {
    //tools.service.testConnection();
    ctx.body = await tools.service.list();
})
router.get('/:id(\\d+)', async (ctx, next) => {
    const item = await tools.service.showById(ctx.params.id);
    ctx.body = head(item);
})
router.post('/', validate(tools.validate.postAddTool) , async (ctx, next) => {
    //const { file, name2 } = ctx.request.body;
    tools.service.add(ctx.request.body)
    ctx.body = 'Hello'
})

router.post('/:id(\\d+)/revision', validate(tools.validate.postAddToolRevision) , async (ctx, next) => {
    const data = ctx.request.body;
    data.toolId = ctx.params.id;
    tools.service.addRevision(data);
    ctx.body = 'Hello';
})

router.post('/revisions', validate(tools.validate.postAddToolRevision) , async (ctx, next) => {
    tools.service.addRevisions(ctx.request.body);
    ctx.body = 'Hello';
})

module.exports = router