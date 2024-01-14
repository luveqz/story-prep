import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1024,
    viewportHeight: 768,

    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
  },
})
