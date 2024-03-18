import type { DuiPageOptions } from './DuiPageOptions'
import { DuiField } from './DuiField'
import type { DuiConfig } from './config/DuiConfig'
import { DuiRestEndpoint } from './DuiRestEndpoint'
import type { DuiPageType } from './DuiPageType'
import type { DuiParameter } from '../configurations/ButtonOptions'
import { DuiAction } from './DuiAction'

export class DuiPage<Config extends DuiConfig = DuiConfig> {
  route: string
  type: DuiPageType
  readDataFrom?: DuiRestEndpoint<Config>
  submitDataTo?: DuiRestEndpoint<Config>

  postSubmit: DuiAction[] = []
  component: any
  fields: DuiField<Config>[]

  actions: DuiAction[]

  constructor(
    { route, type, readDataFrom, submitDataTo, postSubmit, fields, actions }: DuiPageOptions<Config>,
    config: Config
  ) {
    console.log('creating page', route, type)
    this.route = route
    this.type = type
    this.readDataFrom = readDataFrom && new DuiRestEndpoint(readDataFrom)
    this.submitDataTo = submitDataTo && new DuiRestEndpoint(submitDataTo)
    this.postSubmit = postSubmit ? postSubmit.map((x) => new DuiAction(x)) : []
    this.fields = fields.map((x) => new DuiField<Config>(x, config))
    //TODO handle different variants instead of just using default
    console.log('getting component for', type, config.components)
    this.component = config.components[type].default

    this.actions = (actions || []).map((x) => new DuiAction(x))
  }

  matches = (route: string): boolean => {
    const routeParts = route.split('/').filter((x) => !!x)
    const pageRouteParts = this.route.split('/').filter((x) => !!x)
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i] === pageRouteParts[i]) {
        continue
      }
      if (/\{.+\}/.test(pageRouteParts[i])) {
        continue
      }
      return false
    }

    return true
  }

  getParam = (param: DuiParameter, route: string): string => {
    const routeParts = route.split('/').filter((x) => !!x)
    const pageRouteParts = this.route.split('/').filter((x) => !!x)

    const part = pageRouteParts.find((x) => x === `{${param.fieldName}}`)
    const index = part ? pageRouteParts.indexOf(part) : -1

    return index >= 0 ? routeParts[index] : ''
  }

  get visibleFields(): DuiField<Config>[] {
    return this.fields.filter((x) => !x.hidden)
  }
}
