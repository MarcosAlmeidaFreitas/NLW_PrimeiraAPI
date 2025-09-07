/** biome-ignore-all lint/correctness/noUnusedVariables: <explanation> */
/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
/** biome-ignore-all lint/suspicious/useAwait: <explanation> */
import type { FastifyReply, FastifyRequest } from 'fastify'
import { getAuthenticatedUserFromRequest } from '../../utils/get-authenticated-user-from-request.ts'
import { HTTP_Status_Code } from '../HTTP_Status_Code.ts'

export function checkUserRole(role: "student" | "manager") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = getAuthenticatedUserFromRequest(request)

    if (user.role !== role) {
      return reply.status(HTTP_Status_Code.UNAUTHORIZED).send()
    }
  }
}
