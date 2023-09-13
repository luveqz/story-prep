/**
 * Delete the downloads folder to make sure the test has "clean"
 * slate before starting.
 */
export const deleteDownloadsFolder = () => {
  const downloadsFolder = 'cypress/downloads'

  cy.task('deleteFolder', downloadsFolder)
}
