const brazilianCurrencyFormat = (value) => new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)

const brazilianLongDateFormat = (date) => date.toLocaleDateString('pt-br', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

module.exports = {
    brazilianCurrencyFormat,
    brazilianLongDateFormat
}
