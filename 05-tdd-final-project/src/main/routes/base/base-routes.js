class BaseRoutes {
    static getRoutes (routes) {
        if (!routes.length) return {}
        const objRoutes = {}
        routes.forEach(({ method, path, handler }) => {
            objRoutes[`/${path}:${method}`] = handler
        })
        return objRoutes
    }
}

module.exports = {
    BaseRoutes
}