import { server } from "./app.ts"

const PORT = 3333

server.listen({ port: PORT }).then(() => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log(`HTTP server is running on http://localhost:${PORT}`)
})
