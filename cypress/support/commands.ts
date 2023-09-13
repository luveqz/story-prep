import path from 'path'

Cypress.Commands.add('getBySel', (selector: string, ...args) => {
  const selectors = selector.split(' ')
  const nestedSelector = `[data-testid=${selectors.join('] [data-testid=')}]`
  return cy.get(nestedSelector, ...args)
})

Cypress.Commands.add('checkFile', (filename) => {
  const folder = `cypress/downloads`
  const downloadedFilename = path.join(folder, filename)

  cy.readFile(downloadedFilename, { timeout: 100000 })
})
