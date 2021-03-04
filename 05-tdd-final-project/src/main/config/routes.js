const { join } = require('path')
const { readdirSync } = require('fs')

const normalizedRoutesPath = join(__dirname, '../routes/')
let routes = {
    default: (request, response) => {
        response.write('Hello World!')
        return response.end()
    }
}
readdirSync(normalizedRoutesPath).map(file => {
    if (!file.includes('base')) {
        const routeClass = require(`../routes/${file}`)
        routes = {
            ...routes,
            ...routeClass.getRoutes()
        }
    }
})
module.exports = routes
