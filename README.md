# Cypress Storybook

This library contains helper methods to integrate Cypress and Storybook. It contains helpful Cypress commands for loading stories in a way that doesn't require a full reload of the application, allowing tests/specifications to be run much faster.

## Installation

```
npm install cypress-storybook --save-dev
```

Once installed, both Cypress and Storybook need to be configured in order to work. Storybook installation will be based on the framework used (React and Angular are currently supported).

### Cypress

The following will add the Cypress commands to be available to Cypress spec files:

```js
// cypress/support/index.js or .ts
import 'cypress-storybook/cypress'
```

Make sure your `baseUrl` in the `cypress.json` is pointing to your Storybook. For development, this will most likely be `http://localhost:6006`.

```json
{
  "baseUrl": "http://localhost:6006"
}
```

If running these tests as part of a CI process, this base url will have to point to where ever the CI can reach the Storybook page.

If your project has Cypress tests for both Storybook and true end-to-end, you may have to use separate `cypress.json` files for each environment that you're running. Cypress commands allow you to specify which config file: https://docs.cypress.io/guides/guides/command-line.html#cypress-open. For example, you may need to do something like `cypress open --config-file cypress-storybook.json`. You can alias this in an `npm` script like `npm run cypress:storybook:open`.

### Storybook

There are adapters for different frameworks. Currently React and Angular are supported.

The following will set up the Storybook app to understand the Cypress commands. It will register hidden functions on the `window` of the iframe Storybook uses for stories:

### React Storybook

```js
// .storybook/config.js (v5) or .storybook/preview.js (v6)
import 'cypress-storybook/react'
```

### Angular Storybook

```js
// .storybook/config.js (v5) or .storybook/preview.js (v6)
import 'cypress-storybook/angular'
```

## Use

Storybook is a great tool for developing UI. It encourages separation of UI development from backend development. It also encourages building smaller components. Cypress can be used to test or specify behavior of these components. Many examples on the web show loading the main Storybook application and using Cypress to click through the navigation to enable the proper story. The issue with this approach is the story is in an iframe, which is much more difficult to work with. Storybook comes with a router that allows you to visit the story directly. If you expand a story to a full screen, you'll see the URL. It contains something like `iframe.html?id=button--text`.

This library works by loading the `iframe.html` which is blank since no story has been specified. Stories are later mounted using the Storybook routing API to unmount and mount/remount stories by their identifiers. Loading stories does not require a refresh of the Story page (`iframe.html`). The previous story is unmounted from the DOM and the next story is requested from the Storybook router API. Mounting a story takes milliseconds compared to seconds of reloading the entire page. This allows for faster tests.

This library only works if Stories don't leave behind some global state. It is recommended that your stories provide their own state. If you use a global store like Redux, be sure that each story has its own store provider so that the store is created for each story.

### Controls/Args

Args are supported. It is possible to use Args where all properties are controls. Changing an Arg will automatically update a story. Controls implicitly use the Actions addon (see Actions below).

Example:

```js
cy.changeArg('buttonText', 'New Text Value')
```

### Knobs

Knobs are supported. It is possible to create a story where all properties are knob imports and change those inputs during a test. Changing a knob will refresh the story clearing any previous changes to the story. Be sure to change knobs at the start of a test.

Example:

```js
cy.changeKnob('buttonText', 'New Text Value')
```

### Actions

The action addon is supported and will return Sinon Spies. Any assertion that can be made against a Sinon spy can be made against an action. The arguments of the action will be the arguments passed in when `action` is called. For example:

```js
// in a story
export const MyStory = () => {
  return (
    <>
      <button id="button1" onClick={action('click1')}>
        Button 1
      </button>
      <button id="button2" onClick={() => action('click2')('foo')}>
        Button 2
      </button>
    </>
  )
}

// in a test
it('should trigger the action', () => {
  cy.get('#button1').click()
  cy.storyAction('click1').should('have.been.called') // called with a click event

  cy.get('#button2').click()
  cy.storyAction('click2').should('have.been.calledWith', 'foo') // called with arguments passed
})
```

Actions using Args:

```js
// Story
export default {
  title: 'Button',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
}

const Template = (props) => <Button {...props} />

export const Controls = Template.bind({})
Controls.args = {
  children: 'Button',
}

// Cypress
it('should trigger the action', () => {
  cy.get('button').click()
  cy.storyAction('clicked').should('have.been.called')
}
```

An example Cypress file might look like this:

```js
describe('Button', () => {
  // Note the use of `before`
  before(() => {
    // Visit the storybook iframe page once per file
    cy.visitStorybook()
  })

  // Note the use of `beforeEach`
  beforeEach(() => {
    // The first parameter is the category. This is the `title` in CSF or the value in `storiesOf`
    // The second parameter is the name of the story. This is the name of the function in CSF or the value in the `add`
    // This does not refresh the page, but will unmount any previous story and use the Storybook Router API to render a fresh new story
    cy.loadStory('Button', 'Text')
  })

  it('should change the knob', () => {
    // first parameter is the name of the knob
    // second parameter is the value of the knob
    cy.changeKnob('buttonText', 'New Text Value')
    cy.get('button').should('have.text', 'New Text Value')
  })

  it('should change the Arg', () => {
    // first parameter is the name of the Arg
    // second parameter is the value of the Arg
    cy.changeArg('buttonText', 'New Text Value')
    cy.get('button').should('have.text', 'New Text Value')
  })

  it('should fire the click action', () => {
    cy.get('button').click()
    // first parameter is the action name - returns a spy for assertions
    cy.storyAction('click').should('have.been.called')
  })
})
```

## Typescript Support

This project contains type definitions. If your project uses Typescript and the `cypress/support/commands` file is a `*.ts` file and the `cypress/tsconfig.json` was set up to include all TS files in the `cypress` directory, nothing additional needs to be done to get type definitions in Cypress files. If the type definitions are not automatically set up for you, you'll have to add the following to the TS config file:

```json
{
  "compilerOptions": {
    "types": ["cypress", "cypress-storybook/cypress"]
  }
}
```
