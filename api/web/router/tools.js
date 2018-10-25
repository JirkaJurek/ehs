'use strict'

const Router = require('koa-router');
const router = new Router({
    prefix: '/tools'
});
const validate = require('koa2-validation');
const { head } = require('ramda');


const { tools } = require('../../modules');

router.get('/', async (ctx, next) => {
    ctx.body = await tools.service.list(ctx.request.query);
})
router.get('/:id(\\d+)', async (ctx, next) => {
    const item = await tools.service.showById(ctx.params.id);
    ctx.body = head(item);
})
router.post('/', validate(tools.validate.postAddTool) , async (ctx, next) => {
    //const { file, name2 } = ctx.request.body;
    tools.service.add(ctx.request.body)
    ctx.status = 200;
})
router.post('/:id(\\d+)', async (ctx, next) => {
    tools.service.update(ctx.params.id, ctx.request.body);
    ctx.status = 200;
})

router.post('/:id(\\d+)/revision', validate(tools.validate.postAddToolRevision) , async (ctx, next) => {
    const data = ctx.request.body;
    data.toolId = ctx.params.id;
    tools.service.addRevision(data);
    ctx.status = 201;
})

router.post('/revisions', validate(tools.validate.postAddToolRevision) , async (ctx, next) => {
    await tools.service.addRevisions(ctx.request.body);
    ctx.status = 200;
})

router.delete('/:id(\\d+)', async (ctx, next) => {
    tools.service.delete(ctx.params.id);
})

router.post('/more-tools', async (ctx, next) => {
    tools.service.deleteMore(ctx.request.body);
    ctx.body = 'Hello';
})

router.get('/categories', async (ctx, next) => {
    ctx.body = await tools.service.listCategories(ctx.request.query);
})

router.post('/categories', async (ctx, next) => {
    ctx.body = await tools.service.addCategories(ctx.request.body);
})

router.post('/revision-type', async (ctx, next) => {
    await tools.service.addRevisionType(ctx.request.body);
    ctx.status = 200;
})

router.post('/revision-type/:id(\\d+)', async (ctx, next) => {
    await tools.service.updateRevisionType(ctx.request.body);
    ctx.status = 200;
})

router.get('/revision-type', async (ctx, next) => {
    ctx.body = await tools.service.listRevisionType();
})

router.get('/revision-type/upcoming', async (ctx, next) => {
    ctx.body = await tools.service.listUpcomingRevisions();
})

module.exports = router