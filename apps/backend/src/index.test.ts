import request from 'supertest'
import app from './app'
import crypto from 'crypto'

describe('Sample Test', () => {
  it('should create a new account', async () => {
    const res = await request(app).post('/accounts').send({
      id: crypto.randomUUID(),
      balance: 0,
    })
    expect(res.statusCode).toEqual(201)
  })
})
