import React from 'react'

import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import { Button } from '@storybook/react/demo'

export default {
  title: 'Button',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
  decorators: [withKnobs],
}

export const Text = () => {
  const [clicked, setClicked] = React.useState(false)

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          action('click')('foo', 'bar')
          setClicked(true)
        }}
      >
        Hello Button
      </Button>
      <div id="knob">{text('text', 'Default Knob')}</div>
      <div id="clicked">{clicked ? 'clicked!' : ''}</div>
    </React.Fragment>
  )
}

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      Emoji 😀 😎 👍 💯
    </span>
  </Button>
)

const Template = (props) => <Button {...props} />

export const Controls = Template.bind({})
Controls.args = {
  primary: true,
  children: 'Button',
}
