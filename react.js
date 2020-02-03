import { forceReRender } from '@storybook/react'
import addons from '@storybook/addons'
import Events from '@storybook/core-events'
import { toId } from '@storybook/router'
import ReactDOM from 'react-dom'

function setCurrentStory(categorization, story) {
  clearCurrentStory()
  addons.getChannel().emit(Events.SET_CURRENT_STORY, {
    storyId: toId(categorization, story)
  })
  forceReRender()
}

function clearCurrentStory() {
  var root = document.querySelector('#root')
  ReactDOM.unmountComponentAtNode(root)
}

window.__setCurrentStory = setCurrentStory
