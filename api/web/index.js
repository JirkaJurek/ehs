'use strict'

require('dotenv').config();

const Koa = require('koa');
const koaStatic   = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const responseTime = require('koa-response-time');
const cors = require('@koa/cors');
const Multy = require('multy');

const router = require('./router')

const config = {
    port: process.env.PORT || 3030,
    requestLimit: process.env.REQUEST_LIMIT || '50mb',
};

const app = new Koa();
app.use(responseTime())
    .use(logger())
    .use(Multy())
    .use(bodyParser({
        jsonLimit: config.requestLimit,
        formLimit: config.requestLimit
    }))
    .use(cors())
    .use(router())
    .use(koaStatic(__dirname + '/public'))
    .listen(config.port);

module.exports = app;