import { forceReRender } from '@storybook/react'
import addons from '@storybook/addons'
import Events from '@storybook/core-events'
import { toId } from '@storybook/router'
import ReactDOM from 'react-dom'
import { EVENT_ID } from '@storybook/addon-actions'

function setCurrentStory(categorization, story) {
  clearCurrentStory()
  addons.getChannel().emit(Events.SET_CURRENT_STORY, {
    storyId: toId(categorization, story)
  })
  addons.getChannel().emit('storybookjs/knobs/reset')

  forceReRender()
}

function clearCurrentStory() {
  var root = document.querySelector('#root')
  ReactDOM.unmountComponentAtNode(root)

  // Also reset logged actions.
  window.___actions = [];
}

function changeKnob(changedKnob) {
  addons.getChannel().emit('storybookjs/knobs/change', changedKnob)

  // force story to rerender with updated knob
  forceReRender()
}

window.__setCurrentStory = setCurrentStory
window.__changeKnob = changeKnob

// Collect actions emitted by storybook/addon-actions
window.___actions = [];

addons.getChannel().addListener(EVENT_ID, args => {
  window.___actions.push(args);
});
