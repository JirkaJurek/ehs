'use strict'
require('dotenv').config();

const type = process.env.PROCESS_TYPE || 'web'

if (type === 'web') {
  require('./web')
} else if (type === 'worker') {
  require('./worker')
} else {
  throw new Error(`
    ${type} is an unsupported process type. 
    Use one of: 'web', 'worker'!
  `)
}

console.log(`Starting '${type}' process`, { pid: process.pid })