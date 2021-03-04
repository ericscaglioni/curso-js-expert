const { describe, it } = require('mocha')
const CarService = require('./car-service')
const { validCar, validCarCategory, validCustomer } = require('./test/mocks')
const { expect } = require('chai')
const sinon = require('sinon')
const { brazilianCurrencyFormat } = require('../../utils/formatter')
const { Transaction, CarCategory, Car, Customer } = require('../entities')

const makeSut = () => {
  const sandbox = sinon.createSandbox()
  const sut = new CarService()
  return {
    sut,
    sandbox
  }
}

describe('Car Service', () => {
  it('Should retrieve a random position from an array', () => {
    const { sut } = makeSut()
    const data = [0, 1, 2, 3, 4]
    const result = sut.getRandomPositionFromArray(data)

    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  it('Should choose the first id from carIds in carCategory', () => {
    const carCategory = validCarCategory
    const carIdIndex = 0

    const { sut, sandbox } = makeSut()
    sandbox.stub(
      sut,
      sut.getRandomPositionFromArray.name
    ).returns(carIdIndex)

    const result = sut.chooseRandomCarByCarCategory(carCategory)
    const expected = carCategory.carIds[carIdIndex]

    expect(sut.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
  })

  it('Should return an available car', async () => {
    const car = validCar
    const carCategory = { ...validCarCategory }
    carCategory.carIds = [car.id]

    const { sut,sandbox } = makeSut()

    sandbox.stub(
      sut.carRepository,
      sut.carRepository.find.name
    ).resolves(car)

    sandbox.spy(
      sut,
      sut.chooseRandomCarByCarCategory.name
    )

    const result = await sut.getAvailableCarByCategory(carCategory)
    const expected = car
    
    expect(sut.chooseRandomCarByCarCategory.calledOnce).to.be.ok
    expect(sut.carRepository.find.calledWithExactly(car.id))
    expect(result).to.be.deep.equal(expected)
  })

  it('Should calculate final amount in Reais given a carCategory, customer and numberOfDays', async () => {
    const { sut, sandbox } = makeSut()

    const customer = { ...validCustomer }
    customer.age = 50

    const carCategory = { ...validCarCategory }
    carCategory.price = 37.6

    const numberOfDays = 5

    sandbox.stub(
      sut,
      "taxesBasedOnAge"
    ).get(() => [{ from: 40, to: 50, then: 1.3 }])

    const expected = brazilianCurrencyFormat(244.4)
    const result = await sut.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    )
    expect(result).to.be.equal(expected)
  })

  it('Should return a rent receipt given a customer and a car category', async () => {
    const { sut, sandbox } = makeSut()

    const car = new Car(validCar)
    const carCategory = new CarCategory({
      ...validCarCategory,
      price: 37.6,
      carIds: [car.id]
    })

    const customer = new Customer({ ...validCustomer })
    customer.age = 20

    const numberOfDays = 5
    const dueDate = '10 de novembro de 2020'

    const now = new Date(2020, 10, 5)
    sandbox.useFakeTimers(now.getTime())
    sandbox.stub(
      sut.carRepository,
      sut.carRepository.find.name
    ).resolves(car)

    const expectedAmount = brazilianCurrencyFormat(206.8)
    const result = await sut.rent(
      customer,
      carCategory,
      numberOfDays
    )

    const expected = new Transaction({
      customer,
      car,
      amount: expectedAmount,
      dueDate
    })

    expect(result).to.be.deep.equal(expected)
  })
})