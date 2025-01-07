import { RuiApp } from '../RuiApp'
import { RuiPage } from '../RuiPage'

export interface RuiActionContext<PC, FC> {
  data?: unknown
  /**
   * the path corresponding to the page which is also the current page
   */
  path: string
  query?: { [key: string]: string }
  page: RuiPage<PC, FC>
  navigateTo?: (path: string) => void
  app: RuiApp<PC, FC>
}
