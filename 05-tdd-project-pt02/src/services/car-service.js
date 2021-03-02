const CarRepository = require("../repository/car-repository")

class CarService {
  constructor () {
    this.carRepository = new CarRepository()
  }

  getRandomPositionFromArray (list) {
    const listLength = list.length
    return Math.floor(
      Math.random() * listLength
    )
  }

  chooseRandomCarByCarCategory (carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomCarIndex]
    return carId
  }

  async getAvailableCarByCategory (carCategory) {
    const carId = this.chooseRandomCarByCarCategory(carCategory)
    const car = await this.carRepository.find(carId)
    return car
  }
}

module.exports = CarService