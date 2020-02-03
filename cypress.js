/// <reference types="cypress" />

Cypress.Commands.add('visitStorybook', () => {
  return cy.visit('iframe.html')
})

Cypress.Commands.add('loadStory', (categorization, story) => {
  const log = Cypress.log({
    name: 'Load',
    message: [categorization, story],
    $el: Cypress.$('#root')
  })
  log.snapshot('before')

  const win = cy.state('window')
  const now = performance.now()
  win.__setCurrentStory(
    categorization.replace(/[|/]/g, '-').toLowerCase(),
    story.replace(/\s/g, '-').toLowerCase()
  )
  log.set('consoleProps', () => ({
    categorization,
    story,
    renderTime: performance.now() - now
  }))
  log.snapshot('after')
  log.end()

  return Cypress.$('#root')
})
