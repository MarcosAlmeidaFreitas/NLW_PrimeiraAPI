// arquivo de configuração do vitest coverage
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      include: ['src/**/*.ts'],
      exclude: [
        'src/database/migrations',
        'src/database/seed.ts',
        'src/tests',
        'src/routes/TestesAutomatizados',
      ],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
