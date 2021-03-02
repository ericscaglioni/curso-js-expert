const sinon = require('sinon')
const { deepStrictEqual } = require('assert')
const Generator = require('./generator')
;

(() => {
  {
    const generator = new Generator()
    const generatorSpy = sinon.spy(generator, generator.myGenerator.name)
    generator.myGenerator()
    deepStrictEqual(generatorSpy.callCount, 1)
  }
  {
    const generator = new Generator()
    const naturalNumberGenerator = generator.nextNaturalNumber()
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
    console.log(naturalNumberGenerator.next().value)
  }
})()