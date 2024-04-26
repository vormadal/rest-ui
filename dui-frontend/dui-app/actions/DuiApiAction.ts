import { extractField } from '../../utils/objectUtils'
import { DuiParameter } from '../DuiParamater'
import type { IDuiConfig } from '../config/DuiConfig'
import type { DuiAction } from './DuiAction'
import type { DuiActionContext } from './DuiActionContext'
import type { DuiApiActionOptions } from './DuiApiActionOptions'

export class DuiApiAction<Config extends IDuiConfig> implements DuiAction<Config> {
  method: string
  routeTemplate: string
  parameters: DuiParameter[]
  dataField?: string

  _label?: string

  get label() {
    return this._label ?? ''
  }

  constructor({ method, routeTemplate, dataField, paramaters, label }: DuiApiActionOptions<Config>) {
    this._label = label
    this.routeTemplate = routeTemplate
    this.method = method
    this.dataField = dataField
    this.parameters = paramaters?.map((x) => new DuiParameter(x)) ?? []
  }

  async run(context: DuiActionContext): Promise<any> {
    let route = this.routeTemplate
    for (const param of this.parameters) {
      route = param.inject(route, context)
    }

    const data = ['POST', 'PUT'].includes(this.method) ? context.data : undefined
    const response = await context.app.fetch(this.method, route, data)
    try {
      const content = await response.json()

      return extractField(content, this.dataField)
    } catch (e) {}
    return null
  }
}
