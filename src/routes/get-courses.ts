/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <explanation> */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import { HTTP_Status_Code } from './HTTP_Status_Code.ts'

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  // biome-ignore lint/correctness/noUnusedFunctionParameters: <explanation>
  await server.get(
    '/courses',
    {
      schema: {
        tags: ['Courses'],
        summary: 'Get all courses',
        description:
          'Essa rota retorna uma lista de todos os cursos disponíveis.',

        response: {
          200: z.object({
            courses: z.array(
              z.object({
                title: z.string(),
                description: z.string().nullable(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await db
        .select({
          title: courses.title,
          description: courses.description,
        })
        .from(courses)

      return reply.status(HTTP_Status_Code.OK).send({ courses: result })
    }
  )
}
