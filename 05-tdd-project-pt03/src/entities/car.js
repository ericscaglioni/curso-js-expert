const Base = require('./base')

class Car extends Base {
  constructor({ id, name, manufacturer, releaseYear, available }) {
    super({ id, name })
    this.manufacturer = manufacturer
    this.releaseYear = releaseYear
    this.available = available
  }
}

module.exports = Car