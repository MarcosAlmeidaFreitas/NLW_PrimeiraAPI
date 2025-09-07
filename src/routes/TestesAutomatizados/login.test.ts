/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import request from 'supertest'
import { expect, test } from 'vitest'
import { server } from '../../app'
import { makeUser } from '../../tests/factories/make-user.ts'
import { HTTP_Status_Code } from '../HTTP_Status_Code.ts'

test('login', async () => {
  // a gente espera o servidor carregar com todas as rotas
  await server.ready()

  const { user, passwordBeforeHash } = await makeUser()

  const response = await request(server.server)
    .post('/sessions')
    .set('Content-Type', 'application/json')
    .send({
      email: user.email,
      password: passwordBeforeHash,
    })

  expect(response.status).toEqual(HTTP_Status_Code.OK)
  expect(response.body).toEqual({
    token: expect.any(String),
  })
})
