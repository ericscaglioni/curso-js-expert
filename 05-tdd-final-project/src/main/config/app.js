const http = require('http')
const handler = require('./handler')

const app = http.createServer(handler)

module.exports = app
