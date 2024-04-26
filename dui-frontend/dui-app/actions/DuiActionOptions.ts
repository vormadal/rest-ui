import type { DuiApiActionOptions } from './DuiApiActionOptions'
import type { DuiConfig } from '../config/DuiConfig'
import type { DuiRedirectActionOptions } from './DuiRedirectActionOptions'
import type { DuiActionOptionsBase } from './DuiActionOptionsBase'
import type { DuiCompositeActionOptions } from './DuiCompositeActionOptions'

export type DuiActionOptions<Config extends DuiConfig = DuiConfig> = DuiActionOptionsBase & (
  | DuiApiActionOptions
  | DuiRedirectActionOptions
  | DuiCompositeActionOptions
)

