'use strict'

const combineRouters = require('koa-combine-routers')

const toolsRouter = require('./tools')
const usersRouter = require('./users')
const filesRouter = require('./files')
const configRouter = require('./config')
 
const router = combineRouters(
  toolsRouter,
  usersRouter,
  filesRouter,
  configRouter,
)
 
module.exports = router