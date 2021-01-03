describe('loadStory', () => {
  before(() => {
    cy.visitStorybook()
  })

  it('can load camel cased story names', () => {
    cy.loadStory('CamelCase/CamelCase', 'CamelCase')
    cy.contains('This is a CamelCased story')
  })
})
