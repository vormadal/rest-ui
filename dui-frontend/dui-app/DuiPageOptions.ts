import type { DuiActionOptions } from './DuiActionOptions'
import type { DuiFieldOptions } from './DuiFieldOptions'
import type { DuiPageType } from './DuiPageType'
import type { DuiRestEndpointOptions } from './DuiRestEndpointOptions'
import type { DuiConfig } from './config/DuiConfig'

export interface DuiPageOptions<Config extends DuiConfig = DuiConfig> {
  route: string
  type: DuiPageType

  readDataFrom?: DuiRestEndpointOptions<Config>
  submitDataTo?: DuiRestEndpointOptions<Config>
  postSubmit?: DuiActionOptions[]

  fields: DuiFieldOptions<Config>[]

  actions?: DuiActionOptions[]
}
