import type { DuiActionOptionsValues } from './actions/DuiActionOptionValues'
import type { DuiApiActionOptions } from './actions/DuiApiActionOptions'
import type { IDuiConfig } from './config/DuiConfig'
import type { DuiFieldOptions } from './DuiFieldOptions'
import type { DuiPageType } from './DuiPageType'

export interface DuiPageOptions<Config extends IDuiConfig> {
  route: string
  type: DuiPageType

  dataSource?: DuiApiActionOptions

  onSubmit?: DuiActionOptionsValues

  fields: DuiFieldOptions<Config>[]

  actions?: DuiActionOptionsValues[]
}
