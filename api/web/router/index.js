'use strict'

const combineRouters = require('koa-combine-routers')

const toolsRouter = require('./tools')
const usersRouter = require('./users')
const filesRouter = require('./files')
 
const router = combineRouters(
  toolsRouter,
  usersRouter,
  filesRouter,
)
 
module.exports = router