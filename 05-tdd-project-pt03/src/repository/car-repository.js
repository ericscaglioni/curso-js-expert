const BaseRepository = require("./base")
const { join } = require('path')

class CarRepository extends BaseRepository {
  constructor () {
    const file = join(__dirname, '../../database', 'cars.json')
    super({ file })
  }
}

module.exports = CarRepository
