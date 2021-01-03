import { Story, Meta } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'

import Button from './button.component'

export default {
  title: 'Example/Button',
  component: Button,
  decorators: [withKnobs],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

export const Knobs = () => ({
  component: Button,
  props: {
    label: text('text', 'Button'),
    onClick: () => action('click')('foo', 'bar'),
  },
})

const Template: Story<Button> = (args: Button) => ({
  component: Button,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Secondary',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button',
}
