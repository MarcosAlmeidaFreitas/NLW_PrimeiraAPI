// agente separa o server e o app para utilizar as bibliotecas de test
import { server } from "./app.ts"

const PORT = 3333

server.listen({ port: PORT, host: '0.0.0' }).then(() => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log(`HTTP server is running on http://localhost:${PORT}`)
})
