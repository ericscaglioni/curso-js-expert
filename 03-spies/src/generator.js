class Generator {
  *myGenerator () {
    console.log('entrou')
    yield 10
  }

  *nextNaturalNumber () {
    let naturalNumber = 1
    while (true) {
      yield naturalNumber++
    }
  }
}

module.exports = Generator