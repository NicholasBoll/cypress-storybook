## Cypress Storybook

This library contains helper methods to integrate Cypress and Storybook. It contains helpful Cypress commands for loading stories in a way that doesn't require a full reload of the application, allowing tests/specifications to be run much faster.

### Installation

```
npm install cypress-storybook --save-dev
```

Once installed, both Cypress and Storybook need to be configured in order to work. Storybook installation will be based on the type.

#### Cypress

The following will add the Cypress commands to be available to Cypress spec files:

```js
// cypress/support/index.js or .ts
import 'cypress-storybook/cypress`
```

#### React Storybook

The following will set up the Storybook app to understand the Cypress commands. It will register hidden functions one the `window` of the iframe Storybook uses for stories:

```js
// .storybook/config.js
import 'cypress-storybook/react'
```

### Use

Storybook is a great tool for developing UI. It encourages separation of UI development from backend development. It also encourages building smaller components. Cypress can be used to test or specify behavior of these components. Many examples on the web show loading up the main Storybook application and using Cypress to click through the navigation to enable the proper story. The issue with this approach is the story is in an iframe, which is much more difficult to work with. Storybook comes with a router that allows you to visit the story directly. If you expand a story to a full screen, you'll see the URL. It contains something like `iframe.html?id=button--text`.

This library works by loading the `iframe.html` which is blank since no story has been specified. Stories are later mounted using the Storybook routing API to unmount and mount/remount stories by their identifiers. Loading stories does not require a refresh of the Story page (`iframe.html`). The previous story is unmounted from the DOM and the next story is requested from the Storybook router API. Mounting a story takes milliseconds compared to seconds of reloading the entire page. This allows for faster tests.

This library only works if Stories don't leave behind some global state. It is recommended that your stories provide their own state. If you use a global store like Redux, be sure that each story has its own store provider so that the store is created for each story.

An example Cypress file might look like this:

```js
describe('Button', () => {
  before(() => {
    // Visit the storybook iframe page
    cy.visitStorybook()
  })

  beforeEach(() => {
    // The first parameter is the category. This is the `title` in CSF or the value in `storiesOf`
    // The second parameter is the name of the story. This is the name of the function in CSF or the value in the `add`
    // This does not refresh the page, but will unmount any previous story and use the Storybook Router API to render a fresh new story
    cy.loadStory('Button', 'Text')
  })
})
```

### Typescript Support

This project contains type definitions. If your project uses Typescript and the `cypress/support/commands` file is a `*.ts` file and the `cypress/tsconfig.json` was set up to include all TS files in the `cypress` directory, nothing additional needs to be done to get type definitions in Cypress files. If the type definitions are not automatically set up for you, you'll have to add the following to the TS config file:

```json
{
  "compilerOptions": {
    "types": ["cypress", "cypress-storybook/cypress"]
  }
}
```
