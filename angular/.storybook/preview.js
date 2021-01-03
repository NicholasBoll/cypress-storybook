import { setCompodocJson } from '@storybook/addon-docs/angular'
import docJson from '../documentation.json'
setCompodocJson(docJson)

import '../../angular'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
