/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */

//vitest necessita da biblioteca dotenv-cli para carregar as variáveis de ambiente do arquivo .env
import request from 'supertest'
import { expect, test } from 'vitest'
import { server } from '../../app.ts'
import { faker } from '@faker-js/faker'
import { HTTP_Status_Code } from '../HTTP_Status_Code.ts'

test('create a course', async () => {
  //esperando todas as rotas do servidor estarem prontas.
  await server.ready()

  const response = await request(server.server)
    .post('/courses')
    .set('Content-Type', 'application/json')
    .send({
      title: faker.lorem.words(3),
      description:
        faker.lorem.words(4),
    })

    expect(response.statusCode).toEqual(HTTP_Status_Code.CREATED)
    expect(response.body).toEqual({
      courseId: expect.any(String),
    })
})
