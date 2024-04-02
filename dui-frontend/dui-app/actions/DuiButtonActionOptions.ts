import type { DuiConfig } from '../config/DuiConfig'
import type { DuiActionOptionsBase } from './DuiActionOptionsBase'
import type { DuiApiButtonActionOptions } from './DuiApiButtonActionOptions'
import type { DuiRedirectActionOptions } from './DuiRedirectActionOptions'

export type DuiButtonActionOptions<Config extends DuiConfig = DuiConfig> = DuiActionOptionsBase & {
  label: string
} & (DuiRedirectActionOptions<Config> | DuiApiButtonActionOptions<Config>)
