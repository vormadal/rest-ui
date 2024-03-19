import type { DuiConfig } from '../config/DuiConfig'
import type { DuiRedirectActionOptions } from './DuiRedirectActionOptions'

export interface DuiRedirectButtonActionOptions<Config extends DuiConfig = DuiConfig>
  extends DuiRedirectActionOptions<Config> {
  label: string
}
