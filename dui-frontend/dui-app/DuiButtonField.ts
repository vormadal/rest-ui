import { DuiField } from './DuiField'
import type { DuiButtonFieldOptions, DuiFieldOptions } from './DuiFieldOptions'
import { DuiParameter } from './DuiParamater'
import type { DuiActionContext } from './actions/DuiActionContext'
import type { DuiConfig, IDuiConfig } from './config/DuiConfig'

export class DuiButtonField<Config extends IDuiConfig = DuiConfig> extends DuiField<Config> {
  linkTo: string
  paramaters: DuiParameter[]
  constructor(options: DuiFieldOptions<Config>, config: Config) {
    super(options, config)
    const { linkTo, parameters } = options as DuiButtonFieldOptions
    this.linkTo = linkTo
    this.paramaters = (parameters || []).map((x) => new DuiParameter(x))
  }

  format = (data: any) => {
    return ''
  }

  getInputValue = (data: any) => {
    return ''
  }

  getComponentProperties = (context: DuiActionContext, handleChange?: (field: DuiField, value: any) => void) => {
    let route = this.linkTo
    for (const param of this.paramaters) {
      route = param.inject(route, context)
    }
    return { to: route, children: this.displayName }
  }
}
