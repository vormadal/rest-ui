import { DuiField } from './DuiField'
import type { DuiPageOptions } from './DuiPageOptions'
import type { DuiPageType } from './DuiPageType'
import type { DuiConfig } from './config/DuiConfig'

import type { DuiParameter } from './DuiParamater'
import type { DuiAction } from './actions/DuiAction'
import { DuiApiAction } from './actions/DuiApiAction'
import type { DuiButtonAction } from './actions/DuiButtonAction'

export class DuiPage<Config extends DuiConfig = DuiConfig> {
  route: string
  type: DuiPageType

  onSubmit?: DuiAction<Config>[]

  dataSource?: DuiApiAction<Config>

  component: any
  fields: DuiField<Config>[]

  actions: DuiButtonAction<Config>[]

  constructor({ route, type, dataSource, onSubmit, fields, actions }: DuiPageOptions<Config>, config: Config) {
    console.log('creating page', route, type)
    this.route = route
    this.type = type
    this.dataSource = dataSource && new DuiApiAction(dataSource)
    this.onSubmit = config.actionFactory(onSubmit, config)

    this.fields = config.fieldFactory(fields, config)
    //TODO handle different variants instead of just using default
    this.component = config.components[type].default

    this.actions = config.buttonActionFactory(actions)
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
    const templateParts = this.route.split('/').filter((x) => !!x)

    const templatePart = templateParts.find((x) => x === `{${param.valueFieldName}}`)
    const index = templatePart ? templateParts.indexOf(templatePart) : -1

    return index >= 0 ? routeParts[index] : ''
  }

  get visibleFields(): DuiField<Config>[] {
    return this.fields.filter((x) => !x.hidden)
  }
}
