import { defineConfig } from 'drizzle-kit'

if(!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined. Please set it in your environment variables or .env file.');
}
export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    // primeiro vem o dialeto usado, depois o nome do usuário, senha, host e porta e por ultimo o nome do banco de dados
    url: process.env.DATABASE_URL,
  },
  out: './drizzle',
  schema: './src/database/schema.ts',
})