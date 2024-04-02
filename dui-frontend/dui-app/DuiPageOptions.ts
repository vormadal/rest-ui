import type { DuiActionOptions } from './actions/DuiActionOptions'
import type { DuiApiActionOptions } from './actions/DuiApiActionOptions'
import type { DuiButtonActionOptions } from './actions/DuiButtonActionOptions'
import type { DuiConfig } from './config/DuiConfig'
import type { DuiFieldOptions } from './DuiFieldOptions'
import type { DuiPageType } from './DuiPageType'

export interface DuiPageOptions<Config extends DuiConfig = DuiConfig> {
  route: string
  type: DuiPageType

  dataSource?: DuiApiActionOptions<Config>

  onSubmit?: DuiActionOptions<Config>[]

  fields: DuiFieldOptions<Config>[]

  actions?: DuiButtonActionOptions<Config>[]
}
