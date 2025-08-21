/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */

//vitest necessita da biblioteca dotenv-cli para carregar as variáveis de ambiente do arquivo .env
import request from 'supertest'
import { expect, test } from 'vitest'
import { server } from '../../app.ts'
import { HTTP_Status_Code } from '../HTTP_Status_Code.ts'
import { makeCourse } from '../../tests/factories/make-course.ts'

test('get a course by id', async () => {
  //esperando todas as rotas do servidor estarem prontas.
  await server.ready()

  const course = await makeCourse()

  const response = await request(server.server)
    .get(`/courses/${course.id}`)
    

    expect(response.statusCode).toEqual(HTTP_Status_Code.OK)
    expect(response.body).toEqual({
      course: {
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),        
      }
    })
})

test('return 404 for non existing courses', async () => {
  //esperando todas as rotas do servidor estarem prontas.
  await server.ready()


  const response = await request(server.server)
    .get("/courses/8c54aa33-b3a8-4a28-aa4b-01526ea61efe")
    

    expect(response.statusCode).toEqual(HTTP_Status_Code.NOT_FOUND)
})