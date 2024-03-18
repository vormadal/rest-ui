import type { DuiPageOptions } from './DuiPageOptions'
import type { DuiConfig } from './config/DuiConfig'

export interface DuiAppOptions<Config extends DuiConfig = DuiConfig> {
  baseUrl: string
  pages: DuiPageOptions<Config>[]
  dashboard: {
    pages: string[]
  }
}
