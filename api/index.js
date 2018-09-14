'use strict'
require('dotenv').config();

const type = process.env.PROCESS_TYPE || 'web'

if (type === 'web') {
  require('./web')
} else if (type === 'render') {
  require('./render')
} else {
  throw new Error(`
    ${type} is an unsupported process type. 
    Use one of: 'web', 'render'!
  `)
}

console.log(`Starting '${type}' process`, { pid: process.pid })