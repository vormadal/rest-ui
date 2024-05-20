import type { DuiAppOptions } from './DuiAppOptions'
import { DuiPage } from './DuiPage'
import type { IDuiConfig } from './config/DuiConfig'

export class DuiApp<Config extends IDuiConfig> {
  baseUrl: string
  pages: DuiPage<Config>[]
  dashboard: {
    component: any
    pages: DuiPage<Config>[]
  }
  actionsComponent: any

  constructor(options: DuiAppOptions<Config>, config: Config) {
    this.baseUrl = options.baseUrl.endsWith('/')
      ? options.baseUrl.substring(0, options.baseUrl.length - 1)
      : options.baseUrl
    this.actionsComponent = config.components.actions
    this.pages = options.pages.map((x) => new DuiPage<Config>(x, config))
    this.dashboard = {
      component: config.components.dashboard,
      pages: this.pages.filter((x) => options.dashboard.pages.includes(x.route))
    }
  }

  getPage = (route: string): undefined | DuiPage<Config> => {
    return this.pages.find((x) => x.matches(route))
  }

  fetch(method: string, route: string, data?: any) {
    return fetch(`${this.baseUrl}${route.startsWith('/') ? '' : '/'}${route}`, {
      method: method,
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
