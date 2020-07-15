import { forceReRender } from '@storybook/react'
import addons from '@storybook/addons'
import Events from '@storybook/core-events'
import ReactDOM from 'react-dom'

/**
 * Remove punctuation and illegal characters from a story ID.
 *
 * See https://gist.github.com/davidjrice/9d2af51100e41c6c4b4a
 */
export const sanitize = (string) => {
  return (
    string
      .toLowerCase()
      // eslint-disable-next-line no-useless-escape
      .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  )
}

const sanitizeSafe = (string, part) => {
  const sanitized = sanitize(string)
  if (sanitized === '') {
    throw new Error(
      `Invalid ${part} '${string}', must include alphanumeric characters`
    )
  }
  return sanitized
}

/**
 * Generate a storybook ID from a component/kind and story name.
 * This is a copy from https://github.com/storybookjs/csf/blob/next/src/index.ts
 * to be able to support storybook 6.x since they moved toId from storybook/router to storybook/csf
 */
export const toId = (kind, name) =>
  `${sanitizeSafe(kind, 'kind')}--${sanitizeSafe(name, 'name')}`

function setCurrentStory(categorization, story) {
  clearCurrentStory()
  addons.getChannel().emit(Events.SET_CURRENT_STORY, {
    storyId: toId(categorization, story),
  })
  addons.getChannel().emit('storybookjs/knobs/reset')

  forceReRender()
}

function clearCurrentStory() {
  var root = document.querySelector('#root')
  ReactDOM.unmountComponentAtNode(root)
}

function changeKnob(changedKnob) {
  addons.getChannel().emit('storybookjs/knobs/change', changedKnob)

  // force story to rerender with updated knob
  forceReRender()
}

window.__setCurrentStory = setCurrentStory
window.__changeKnob = changeKnob
