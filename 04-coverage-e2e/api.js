const http = require('http')

const DEFAULT_USER = { username: 'eric', password: '123' }

const routes = {
  '/contacts:get': (request, response) => {
    response.write('contact us page')
    return response.end()
  },

  '/login:post': async (request, response) => {
    for await (const data of request) {
      const { username, password } = JSON.parse(data)
      if (
        username !== DEFAULT_USER.username ||
        password !== DEFAULT_USER.password
      ) {
        response.writeHead(401)
        response.write('Login failed')
        return response.end()
      }
    }
    response.write('Logged succesfully')
    return response.end()
  },

  default: (request, response) => {
    response.write('Hello World!')
    return response.end()
  }
}

const handler = function (request, response) {
  const { url, method } = request
  const routeKey = (`${url}:${method}`).toLowerCase()
  const route = routes[routeKey] || routes.default
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  return route(request, response)
}

const app = http.createServer(handler)
  .listen(3000, () => console.log('app is running at port 3000'))

module.exports = app