/** biome-ignore-all lint/correctness/noUnusedVariables: <explanation> */
/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
/** biome-ignore-all lint/suspicious/useAwait: <explanation> */
import type { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { HTTP_Status_Code } from '../HTTP_Status_Code.ts'

type JWTPayload = { 
  sub: string,
  role: 'student' | 'manager'
}

export async function checkRequestJWT(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be set.')
  }

  const token = request.headers.authorization

  if (!token) {
    return reply.status(HTTP_Status_Code.UNAUTHORIZED).send('Unauthorized')
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
    request.user = payload
  } catch (error) {
    return reply.status(HTTP_Status_Code.UNAUTHORIZED).send('Unauthorized')
  }
}
