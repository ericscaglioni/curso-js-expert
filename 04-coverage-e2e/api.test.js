const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const { deepStrictEqual } = require('assert')

describe('API Suite test', () => {
  describe('/default', () => {
    it('Should return default page and HTTP status 200', async () => {
      const response = await request(app)
        .get('/')
        .expect(200)
      deepStrictEqual(response.text, 'Hello World!')
    })
  })

  describe('/contacts', () => {
    it('Should return contact page and HTTP status 200', async () => {
      const response = await request(app)
        .get('/contacts')
        .expect(200)
      deepStrictEqual(response.text, 'contact us page')
    })
  })

  describe('/login', () => {
    it('Should return HTTP status 401 when authentication failed', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'eric', password: '12' })
        .expect(401)
      deepStrictEqual(response.text, 'Login failed')
    })

    it('Should return HTTP status 200 on success', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'eric', password: '123' })
        .expect(200)
      deepStrictEqual(response.text, 'Logged succesfully')
    })
  })
})