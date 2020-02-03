import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button } from '@storybook/react/demo'

export default {
  title: 'Button',
  component: Button
}

export const Text = () => {
  const [clicked, setClicked] = React.useState(false)

  return (
    <Button
      onClick={() => {
        setClicked(true)
      }}
    >
      Hello Button {clicked ? 'clicked' : ''}
    </Button>
  )
}

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
)
