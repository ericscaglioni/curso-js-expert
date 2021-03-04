const routes = require('./routes')

const handler = function (request, response) {
    const { url, method } = request
    const routeKey = (`${url}:${method}`).toLowerCase()
    const route = routes[routeKey] || routes.default
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    return route(request, response)
}

module.exports = handler