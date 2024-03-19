import type { DuiConfig } from '../config/DuiConfig'
import type { DuiApiActionOptions } from './DuiApiActionOptions'

export interface DuiApiButtonActionOptions<Config extends DuiConfig = DuiConfig> extends DuiApiActionOptions {
  label: string
}
