const CarRepository = require('../repository/car-repository')
const { Tax, Transaction } = require('../entities')
const { brazilianCurrencyFormat, brazilianLongDateFormat } = require('../../utils/formatter')

class CarService {
  constructor () {
    this.carRepository = new CarRepository()
    this.taxesBasedOnAge = Tax.taxesBasedOnAge
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

  async calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer
    const { price } = carCategory
    const { then: tax } = this.taxesBasedOnAge
      .find(tax => age >= tax.from && age <= tax.to)

    const finalPrice = ((tax * price) * numberOfDays)
    return brazilianCurrencyFormat(finalPrice)
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCarByCategory(carCategory)
    const finalPrice = await this.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    )
    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)
    const dueDate = brazilianLongDateFormat(today)

    return new Transaction({
      customer,
      car,
      amount: finalPrice,
      dueDate
    })
  }
}

module.exports = CarService