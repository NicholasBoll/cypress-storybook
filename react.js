import ReactDOM from 'react-dom'

import { forceReRender } from '@storybook/react'

import { setCurrentStory, changeKnob } from './common'

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
