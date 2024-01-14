/* 
  In order to solve build errors, I'm using CommonJS
  as suggested by theCypress staff:
  https://github.com/cypress-io/cypress/issues/22038#issuecomment-1144887431
*/
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1024,
    viewportHeight: 768,

    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
  },
})
