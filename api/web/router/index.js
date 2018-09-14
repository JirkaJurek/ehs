'use strict'

const combineRouters = require('koa-combine-routers')

const toolsRouter = require('./tools')
const usersRouter = require('./users')
 
const router = combineRouters(
  toolsRouter,
  usersRouter
)
 
module.exports = router