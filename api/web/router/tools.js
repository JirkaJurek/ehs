'use strict'

const Router = require('koa-router');
const router = new Router({
    prefix: '/tools'
});
const validate = require('koa2-validation');
const Joi = require('joi');


const { tools } = require('../../modules');

const v = {
    body: {
        //name: Joi.string().required(),
        name2: Joi.string(),
        file: Joi.object(),
    }
}

router.get('/', async (ctx, next) => {
    tools.service.testConnection();
    ctx.body = 'Hello'
})
router.post('/', validate(v), async (ctx, next) => {
    const { file, name2 } = ctx.request.body;
    tools.service.add({ name: name2 })
    ctx.body = 'Hello'
})

module.exports = router