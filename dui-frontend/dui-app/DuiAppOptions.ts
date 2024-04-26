import type { DuiPageOptions } from './DuiPageOptions'
import type { IDuiConfig } from './config/DuiConfig'

export interface DuiAppOptions<Config extends IDuiConfig> {
  baseUrl: string
  pages: DuiPageOptions<Config>[]
  dashboard: {
    pages: string[]
  }
}
