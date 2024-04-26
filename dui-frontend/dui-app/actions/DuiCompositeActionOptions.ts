import type { DuiConfig } from '../config/DuiConfig'
import type { DuiActionOptions } from './DuiActionOptions'

export type DuiCompositeActionOptions<Config extends DuiConfig = DuiConfig> = {
  type: 'composite'
  actions: DuiActionOptions<Config>[]
}
