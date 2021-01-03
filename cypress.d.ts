/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Visit the blank test page. This should be in a `before` block of every test page. This command will load the iframe.html
     * file. It is meant to be used with `cy.loadStory`
     */
    visitStorybook(options?: Partial<VisitOptions>): Cypress.Chainable<Window>

    /**
     * Load a story. This will invoke the storybook router,
     * unmount a previous story, mount the current story and force a rerender
     * This should be in a `beforeEach` block to force a fresh new story
     * @param categorization Categorization information found in the `.storiesOf` function or `title` - usually used for menu navigation
     * @param story Variant of the story example in the `.add` function or the export name
     * @example
     * cy.loadStory('Button', 'Primary')
     */
    loadStory(categorization: string, story: string): Cypress.Chainable<JQuery>

    /**
     * Change a knob of your story. Useful for testing permutations of a story without creating unique ones.
     * @param name Name of the knob provided in the story
     * @param value Value of the knob. The type is not checked, so make sure it is valid for your story
     */
    changeKnob(name: string, value: any): Cypress.Chainable<null>

    /**
     * Change an Arg of your story. Useful for testing permutations of a story without creating unique ones.
     * @param name Name of the Arg provided in the story
     * @param value Value of the Arg. The type is not checked, so make sure it is valid for your story
     */
    changeArg(name: string, value: any): Cypress.Chainable<null>

    /**
     * Retrieve a spy of a given action by name
     * @param name The name as passed into the `action` function. E.g. `click` for `action('click')('foo')`.
     * @example
     * cy.storyAction('click').should('have.been.called')
     */
    storyAction(name: string): Cypress.Chainable<sinon.SinonSpy>
  }
}
