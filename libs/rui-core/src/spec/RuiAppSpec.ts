/**
 * The spec file can be stored as a json object in local storage, on file system, or in a database.
 */

import { RuiPageSpec } from './RuiPageSpec.js'

export interface RuiAppSpec {
  baseUrl: string
  pages: RuiPageSpec[]
  /**
   * The dashboard is a special page that can summarize the other pages.
   */
  dashboards: DashboardRef[]
}

export interface DashboardRef {
  id: string
  title: string
  main?: boolean
}
