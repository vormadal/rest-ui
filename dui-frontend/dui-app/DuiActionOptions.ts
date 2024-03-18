import type { DuiParameter } from '../configurations/ButtonOptions'
import type { DuiConfig } from './config/DuiConfig'

export interface DuiActionOptions<Config extends DuiConfig = DuiConfig> {
  //TODO type and maybe multiple steps? right everything is just links

  dataField?: string
  to: string
  label: string

  parameters?: DuiParameter[]
}
