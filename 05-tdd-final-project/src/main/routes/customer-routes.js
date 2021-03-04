const { Route, BaseRoutes } = require('./base')

class CustomerRoutes extends BaseRoutes {
    static getRoutes () {
        const getCustomers = new Route({
            method: 'get',
            path: 'customers',
            handler: CustomerRoutes.getCustomers
        })
        return super.getRoutes([getCustomers])
    }

    static async getCustomers (request, response) {
        response.write('Customers page')
        return response.end()
    }
}

module.exports = CustomerRoutes
