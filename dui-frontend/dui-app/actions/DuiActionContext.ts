import type { LocationQuery, Router } from 'vue-router'
import type { DuiPage } from '../DuiPage'
import type { DuiApp } from '../DuiApp'

export interface DuiActionContext {
  router: Router
  data?: any
  /**
   * the path corresponding to the page which is also the current page
   */
  path: string
  query?: LocationQuery
  page: DuiPage<any>

  app: DuiApp<any>
}
