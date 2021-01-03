import { forceReRender } from '@storybook/angular'

import { setCurrentStory, changeKnob } from './common'

window.__setCurrentStory = function (categorization, story) {
  setCurrentStory(categorization, story)
  forceReRender()
}

window.__changeKnob = function (changedKnob) {
  changeKnob(changedKnob)

  // force story to rerender with updated knob
  forceReRender()
}
