import type { DuiApiActionOptions } from './DuiApiActionOptions'
import type { DuiConfig } from '../config/DuiConfig'
import type { DuiRedirectActionOptions } from './DuiRedirectActionOptions'

export type DuiActionOptions<Config extends DuiConfig = DuiConfig> = { type: string } & (
  | DuiApiActionOptions
  | DuiRedirectActionOptions
)

