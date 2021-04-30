// @ts-check
/// <reference path="../../cypress.d.ts" />

describe('loadStorybook', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:6007')
    cy.visitStorybook()
  })

  it('should load the right story', () => {
    cy.loadStory('Example/Button', 'Primary')
    cy.get('button').should('contain', 'Primary')
  })

  it('should load the another story', () => {
    cy.loadStory('Example/Button', 'Secondary')
    cy.get('button').should('contain', 'Secondary')
  })

  it('should reset any knobs', () => {
    cy.loadStory('Example/Button', 'Knobs')
    cy.get('button').should('contain', 'Button')
    cy.changeKnob('text', 'Changed Text')
    cy.get('button').should('contain', 'Changed Text')
    cy.loadStory('Button', 'Text')
    cy.get('button').should('contain', 'Button')
  })
})

describe('Button', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:6007')
    cy.visitStorybook()
  })

  context('given the Button/Text story is rendered', () => {
    beforeEach(() => {
      cy.loadStory('Example/Button', 'Knobs')
    })

    it('should render a button', () => {
      cy.get('button').should('exist')
    })

    context('when the button is clicked', () => {
      beforeEach(() => {
        cy.get('button').click()
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
  })

  context('when the Button/Controls story is rendered', () => {
    beforeEach(() => {
      cy.loadStory('Example/Button', 'Primary')
    })

    context('when the control is changed to "Test"', () => {
      it('should update the text element to "Test"', () => {
        cy.changeArg('children', 'Test')
        cy.get('button').should('contain', 'Test')
      })

      it('should appropriately reset args between story loads', () => {
        cy.get('button').should('contain', 'Button')
      })
    })

    context('when the button is clicked', () => {
      beforeEach(() => {
        cy.get('button').click()
      })

      it('should fire the clicked action once', () => {
        cy.storyAction('onClick').should('have.been.calledOnce')
      })
    })
  })
})
