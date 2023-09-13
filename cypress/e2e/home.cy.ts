import { deleteDownloadsFolder } from '../utils/file'

describe('Homepage', () => {
  it('shows error tooltip after clicking the "Paste Lesson" button if no API key is provided ', () => {
    cy.visit('/')

    cy.getBySel('error-tooltip').should('not.exist')
    cy.getBySel('call-to-action').click()
    cy.getBySel('error-tooltip').should('exist')
  })

  it('opens lesson sheet modal after clicking example card', () => {
    cy.visit('/')

    cy.getBySel('lesson-sheet').should('not.exist')
    cy.getBySel('story-card').first().click()
    cy.getBySel('lesson-sheet').should('exist')
  })

  it('downloads lesson sheet after clicking the "Save as PDF" button', () => {
    cy.visit('/')

    deleteDownloadsFolder()

    cy.getBySel('lesson-sheet').should('not.exist')
    cy.getBySel('story-card').first().click()
    cy.getBySel('lesson-sheet').should('exist')

    cy.getBySel('save-btn').click()
    cy.checkFile('a-perfect-day-for-bananafish.pdf')
  })
})
