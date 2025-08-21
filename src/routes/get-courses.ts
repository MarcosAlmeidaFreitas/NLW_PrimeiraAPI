/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <explanation> */

import { asc, count, eq, ilike } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../database/client.ts'
import { courses, enrollments } from '../database/schema.ts'
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

        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(['id', 'title']).optional().default('id'),
          page: z.coerce.number().optional().default(1),
        }),
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
                description: z.string().nullable(),
                enrollments: z.number()
              })
            ),
            totalCourses: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      // se o search for enviado, ele vai filtrar os cursos pelo título
      const { search, orderBy, page } = request.query

      const [result, totalCourses] = await Promise.all([
        db
          .select({
            id: courses.id,
            title: courses.title,
            description: courses.description,
            enrollments: count(enrollments.id)
          })
          .from(courses)
          .leftJoin(enrollments, eq(enrollments.coursesId, courses.id))
          .groupBy(courses.id)
          .orderBy(asc(courses[orderBy]))
          .offset((page - 1) * 2)
          .limit(10)
          .where(search ? ilike(courses.title, `%${search}%`) : undefined),

        db.$count(
          courses,
          search ? ilike(courses.title, `%${search}%`) : undefined
        ),
      ])

      return reply
        .status(HTTP_Status_Code.OK)
        .send({ courses: result, totalCourses })
    }
  )
}
