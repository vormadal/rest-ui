import { extractField } from '../../utils/objectUtils'
import { DuiParameter } from '../DuiParamater'
import type { DuiConfig } from '../config/DuiConfig'
import type { DuiAction } from './DuiAction'
import type { DuiActionContext } from './DuiActionContext'
import type { DuiApiActionOptions } from './DuiApiActionOptions'

export class DuiApiAction<Config extends DuiConfig = DuiConfig> implements DuiAction<Config> {
  method: string
  routeTemplate: string
  parameters: DuiParameter[]
  dataField?: string

  constructor({ method, routeTemplate, dataField, paramaters }: DuiApiActionOptions) {
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
    const content = await response.json()

    return extractField(content, this.dataField)
  }
}
