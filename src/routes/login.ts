/** biome-ignore-all lint/suspicious/useAwait: <explanation> */

import { verify } from 'argon2'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { db } from '../database/client.ts'
import { users } from '../database/schema.ts'
import { HTTP_Status_Code } from './HTTP_Status_Code.ts'

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/sessions',
    {
      schema: {
        tags: ['auth'],
        summary: 'User login to the platform',
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        response: {
          200: z.object({ token: z.string() }),
          400: z.object({ message: z.string() }),
        }
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      const result = await db.select().from(users).where(eq(users.email, email))

      if (result.length === 0) {
        return reply
          .status(HTTP_Status_Code.BAD_REQUEST)
          .send({ message: 'Credenciais inválidas' })
      }

      const user = result[0]

      const doesPasswordsMatch = await verify(user.password, password)

      if (!doesPasswordsMatch) {
        return reply
          .status(HTTP_Status_Code.BAD_REQUEST)
          .send({ message: 'Credenciais Inválidas' })
      }

      //verificando se o .env tem a chave de acesso
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET must be set.')
      }

      //criando o jwt com informações do usuário como id e cargo e passando a chave jwt
      const token = jwt.sign(
        { sub: user.id, role: user.role },
        process.env.JWT_SECRET
      )

      return reply.status(HTTP_Status_Code.OK).send({ token })
    }
  )
}
