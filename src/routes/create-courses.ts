import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import { HTTP_Status_Code } from './HTTP_Status_Code.ts'

const MinimalCaractereTitle = 5

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  // biome-ignore lint/correctness/noUnusedFunctionParameters: <explanation>
  await server.post(
    '/courses',
    {
      schema: {
        tags: ['Courses'],
        summary: 'Create a new course',
        description: 'Essa rota recebe um titulo e uma descrição para criar um curso', 
        
        body: z.object({
          title: z
            .string()
            .min(
              MinimalCaractereTitle,
              'O título deve ter pelo menos 5 caracteres.'
            ),
          description: z.string().optional(),
        }),
        response: {
          201: z.object({
            courseId: z.uuid().describe('O curso foi criado com sucesso.'),
          }),
        },
      },
    },
    async (request, reply) => {
      // type Course = {
      //   title: string
      //   description?: string
      // }

      // const course = request.body as Course

      // if (!course.title) {
      //   return reply.status(400).send({ message: 'Title is required.' })
      // }

      const { title, description } = request.body

      const [newCourse] = await db
        .insert(courses)
        .values({
          title,
          description,
        })
        .returning()

      return reply
        .status(HTTP_Status_Code.CREATED)
        .send({ courseId: newCourse.id })
    }
  )
}
