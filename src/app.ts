import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import scalarAPIReference from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createCourseRoute } from './routes/create-courses.ts'
import { getCourseByIdRoute } from './routes/get-course-by-id.ts'
import { getCoursesRoute } from './routes/get-courses.ts'
import { HTTP_Status_Code } from './routes/HTTP_Status_Code.ts'
import { loginRoute } from './routes/login.ts'

// Nesse servidor está sendo utilizado o pretty para gerar logs mais legíveis e o zod para validação de schemas
const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

// Ele so vai mostrar a documentação se estiver rodando em ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  // registrando o swagger para gerar a documentação da API
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Desafio Node.JS',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  //registrando o scalar que é uma alternativa ao swagger-ui para a visualização da documentação da API
  server.register(scalarAPIReference, {
    routePrefix: '/references',
    configuration: {
      theme: 'kepler',
    },
  })

  // registrando o swagger-ui para visualizar a documentação da API
  server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })
}

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

// biome-ignore lint/suspicious/useAwait: <explanation>
// biome-ignore lint/correctness/noUnusedFunctionParameters: <explanation>
server.get('/health', (request, reply) => {
  return reply.status(HTTP_Status_Code.OK).send({ message: 'Server OK' })
})

server.register(getCoursesRoute)
server.register(createCourseRoute)
server.register(getCourseByIdRoute)
server.register(loginRoute)

export { server }