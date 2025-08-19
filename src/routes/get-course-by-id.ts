import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import { HTTP_Status_Code } from './HTTP_Status_Code.ts'

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  // biome-ignore lint/correctness/noUnusedFunctionParameters: <explanation>
  await server.get(
    '/courses/:id',
    {
      schema: {
        tags: ['Courses'],
        summary: 'Get course by ID',
        description:
          'Essa rota recebe um id de um curso e retorna os detalhes do curso',

        params: z.object({
          id: z.uuid('O ID do curso deve ser um UUID válido.'),
        }),
        response: {
          200: z.object({
            course: z.object({
              id: z.uuid(),
              title: z.string(),
              description: z.string().nullable(),
            }).describe('Os detalhes do curso.')
          }),
          404: z.object({
            message: z.string().describe('Curso não encontrado.'),
          }),
        }
        
      },
    },
    async (request, reply) => {
      // type Params = {
      //   id: string
      // }

      // const params = request.params as Params
      // const courseId = params.id

      const courseId = request.params.id
      const courseResult = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId))

      if (courseResult.length > 0) {
        return reply.status(HTTP_Status_Code.OK).send({ course: courseResult[0] })
      }

      return reply
        .status(HTTP_Status_Code.NOT_FOUND)
        .send({ message: 'Course not found.' })
    }
  )
}
