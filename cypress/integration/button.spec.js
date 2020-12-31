// @ts-check
/// <reference path="../../cypress.d.ts" />

describe('loadStorybook', () => {
  before(() => {
    cy.visitStorybook()
  })

  it('should load the right story', () => {
    cy.loadStory('Button', 'Text')
    cy.get('button').should('contain', 'Hello Button')
  })

  it('should reset any knobs', () => {
    cy.loadStory('Button', 'Text')
    cy.get('#knob').should('contain', 'Default Knob')
    cy.changeKnob('text', 'Changed Text')
    cy.get('#knob').should('contain', 'Changed Text')
    cy.loadStory('Button', 'Text')
    cy.get('#knob').should('contain', 'Default Knob')
  })
})

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
        cy.get('#clicked').should('contain', 'clicked!')
      })

      it('should fire a click action', () => {
        cy.storyAction('click').should('be.called')
      })

      it('should fire a click action only once, clearing previous calls', () => {
        cy.storyAction('click').should('be.calledOnce')
      })

      it('should fire a click action with args', () => {
        cy.storyAction('click').should('be.calledWith', ['foo', 'bar'])
      })

      context('when the Button/Text story is re-rendered', () => {
        beforeEach(() => {
          cy.loadStory('Button', 'Text')
        })

        it('should reset all state', () => {
          cy.get('button').should('not.contain', 'clicked')
        })

        it('should reset all spies', () => {
          cy.storyAction('click').should('not.be.called')
        })
      })
    })

    context('when the knob is changed to "Test"', () => {
      beforeEach(() => {
        cy.changeKnob('text', 'Test')
      })

      it('should update the #knob element text to "test"', () => {
        cy.get('#knob').should('contain', 'Test')
      })
    })
  })
})
