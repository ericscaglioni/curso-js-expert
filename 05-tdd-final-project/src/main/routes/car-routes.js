const { Route, BaseRoutes } = require('./base')

class CarRoutes extends BaseRoutes {
    static getRoutes () {
        const getCars = new Route({
            method: 'get',
            path: 'cars',
            handler: CarRoutes.getCars
        })
        return super.getRoutes([getCars])
    }

    static async getCars (request, response) {
        response.write('Cars page')
        return response.end()
    }
}

module.exports = CarRoutes
