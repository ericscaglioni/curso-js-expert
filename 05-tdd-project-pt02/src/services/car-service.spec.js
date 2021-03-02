const { describe, it } = require('mocha')
const CarService = require('./car-service')
const { validCar, validCarCategory } = require('./test/mocks')
const { expect } = require('chai')
const sinon = require('sinon')

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
})