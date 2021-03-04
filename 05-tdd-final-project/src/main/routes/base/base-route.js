class Route {
    constructor({ method, path, handler }) {
        this.method = method.toLowerCase()
        this.path = path.toLowerCase()
        this.handler = handler
    }
}

module.exports = {
    Route
}
