import 'reflect-metadata'

import request from 'supertest'
import { app } from '../../server/koa/koa.server'

const getApp = () => {
  return app.callback()
}

describe('onfly integrations test', () => {
  describe('testing auth requests', () => {
    test('auth when user not exist', async () => {
      await request(getApp())
        .post('/user/auth')
        .send({ email: 'lucas2@email.com', password: '123456' })
        .set('Accept', 'application/json')
        .expect(401)
        .then()
    })

    test('auth should be logged with correct data', async () => {
      await request(getApp())
        .post('/user')
        .send({ email: 'lucas@email.com', password: '123456', name: 'lucas' })
        .set('Accept', 'application/json')
        .expect(200)
        .then()

      await request(getApp())
        .post('/user/auth')
        .send({ email: 'lucas@email.com', password: '123456' })
        .set('Accept', 'application/json')
        .expect(200)
        .then()
    })

    test('auth should be return 401 with incorrect password', async () => {
      await request(getApp())
        .post('/user/auth')
        .send({ email: 'lucas@email.com', password: '1234567' })
        .set('Accept', 'application/json')
        .expect(401)
        .then()
    })
  })

  describe('testing expense requests', () => {
    let user1 = { token: '', id: null }
    let user2 = { token: '', id: null }
    let expenseId1
    let expenseId2
    beforeAll(async () => {
      await request(getApp())
        .post('/user')
        .send({ email: 'expense1@email.com', password: '123456', name: 'Lucas' })
        .set('Accept', 'application/json')
        .then(data => {
          user1.id = data.body.id
        })

      await request(getApp())
        .post('/user/auth')
        .send({ email: 'expense1@email.com', password: '123456' })
        .set('Accept', 'application/json')
        .then(data => {
          user1.token = data.body.token
        })

      await request(getApp())
        .post('/user')
        .send({ email: 'expense2@email.com', password: '123456', name: 'Lucas' })
        .set('Accept', 'application/json')
        .then(data => {
          user2.id = data.body.id
        })

      await request(getApp())
        .post('/user/auth')
        .send({ email: 'expense2@email.com', password: '123456' })
        .set('Accept', 'application/json')
        .then(data => {
          user2.token = data.body.token
        })
    })

    test('should create a expense', async () => {
      await request(getApp())
        .post('/expense')
        .set('Authorization', `Bearer ${user1.token}`)
        .send({
          value: 50,
          description: 'Uma descricao',
          date: '2024-04-29'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(data => {
          expenseId1 = data.body.id
        })

      await request(getApp())
        .post('/expense')
        .set('Authorization', `Bearer ${user2.token}`)
        .send({
          value: 50,
          description: 'Uma descricao',
          date: '2024-04-29'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .then(data => {
          expenseId2 = data.body.id
        })
    })

    test('should throw 404 if expense is not owner', async () => {
      await request(getApp())
        .put(`/expense/${expenseId2}`)
        .set('Authorization', `Bearer ${user1.token}`)
        .send({
          value: 65,
          description: 'Uma descricao update',
          date: '2024-04-29'
        })
        .set('Accept', 'application/json')
        .expect(404)
        .then()
    })

    test('should return 204 if expense is owner', async () => {
      await request(getApp())
        .put(`/expense/${expenseId1}`)
        .set('Authorization', `Bearer ${user1.token}`)
        .send({
          value: 80,
          description: 'Uma descricao update',
          date: '2024-04-29'
        })
        .set('Accept', 'application/json')
        .expect(204)
        .then()
    })

    test('should list expense only from its owner', async () => {
      await request(getApp())
        .get(`/expense`)
        .set('Authorization', `Bearer ${user1.token}`)
        .set('Accept', 'application/json')
        .expect(200)
        .then(data => {
          data.body?.map(({ user: { id } }) => expect(id).toBe(user1.id))
        })
    })

    test('should throw 404 if get expense its not owner', async () => {
      await request(getApp())
        .get(`/expense/${expenseId2}`)
        .set('Authorization', `Bearer ${user1.token}`)
        .expect(404)
        .then()
    })
  })
})
