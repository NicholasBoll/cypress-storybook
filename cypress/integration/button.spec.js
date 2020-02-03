// @ts-check
/// <reference path="../../cypress.d.ts" />

describe('Button', () => {
  before(() => {
    cy.visitStorybook()
  })

  context('given the Button/Text story is rendered', () => {
    beforeEach(() => {
      cy.loadStory('Button', 'Text')
    })

    it('should render a button', () => {
      cy.get('button').should('exist')
    })

    context('when the button is clicked', () => {
      beforeEach(() => {
        cy.get('button').click()
      })

      it('should update the button text to include "clicked"', () => {
        cy.get('button').should('contain', 'clicked')
      })

      context('when the Button/Text story is re-rendered', () => {
        beforeEach(() => {
          cy.loadStory('Button', 'Text')
        })

        it('should reset all state', () => {
          cy.get('button').should('not.contain', 'clicked')
        })
      })
    })
  })
})
