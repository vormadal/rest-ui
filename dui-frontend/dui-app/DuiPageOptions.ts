import type { DuiActionOptions } from './actions/DuiActionOptions'
import type { DuiFieldOptions } from './DuiFieldOptions'
import type { DuiPageType } from './DuiPageType'
import type { DuiRestEndpointOptions } from './DuiRestEndpointOptions'
import type { DuiConfig } from './config/DuiConfig'
import type { DuiButtonActionOptions } from './actions/DuiButtonActionOptions'

export interface DuiPageOptions<Config extends DuiConfig = DuiConfig> {
  route: string
  type: DuiPageType

  readDataFrom?: DuiRestEndpointOptions<Config>

  onSubmit?: DuiActionOptions<Config>[]

  fields: DuiFieldOptions<Config>[]

  actions?: DuiButtonActionOptions<Config>[]
}
