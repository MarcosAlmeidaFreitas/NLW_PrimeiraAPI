/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
/** biome-ignore-all lint/suspicious/noConstantBinaryExpressions: <explanation> */
/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */

//vitest necessita da biblioteca dotenv-cli para carregar as variáveis de ambiente do arquivo .env
import request from 'supertest'
import { expect, test } from 'vitest'
import { server } from '../../app.ts'
import { HTTP_Status_Code } from '../HTTP_Status_Code.ts'
import { makeCourse } from '../../tests/factories/make-course.ts'
import { randomUUID } from 'node:crypto'

test('get a courses', async () => {
  // esperando todas as rotas do servidor estarem prontas.
  await server.ready()

  const titleId = randomUUID()

  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const course = await makeCourse(titleId)
  // fazer a verificação da matricula

  const response = await request(server.server)
    .get(`/courses?search=${titleId}`)

  expect(response.status).toEqual(HTTP_Status_Code.OK)
  expect(response.body).toEqual({
    courses: [{
      id: expect.any(String),
      title: titleId,
      description: expect.any(String) || null,
      enrollments: 0,
    }],
    totalCourses: 1,
  })
})
