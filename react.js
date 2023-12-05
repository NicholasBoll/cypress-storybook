import ReactDOM from 'react-dom'

import { setCurrentStory, changeKnob } from './common'
import { addons } from '@storybook/preview-api'
import { FORCE_RE_RENDER } from '@storybook/core-events'

function clearCurrentStory() {
  var root = document.querySelector('#root')
  ReactDOM.unmountComponentAtNode(root)
}

window.__setCurrentStory = function (categorization, story) {
  clearCurrentStory()
  setCurrentStory(categorization, story)
  forceReRender()
}

window.__changeKnob = function (changedKnob) {
  changeKnob(changedKnob)

  // force story to rerender with updated knob
  forceReRender()
}

function forceReRender() {
  addons.getChannel().emit(FORCE_RE_RENDER)
}