import type { DuiPage } from './DuiPage'
import { DuiParameter } from './DuiParamater'
import type { DuiRestEndpointOptions } from './DuiRestEndpointOptions'
import type { DuiConfig } from './config/DuiConfig'

export class DuiRestEndpoint<Config extends DuiConfig = DuiConfig> {
  path: string
  method: string // GET POST PUT
  dataField?: string
  parameters: DuiParameter[]

  constructor({ path, method, dataField, paramaters }: DuiRestEndpointOptions<Config>) {
    this.path = path
    this.method = method
    this.dataField = dataField
    this.parameters = paramaters?.map((x) => new DuiParameter(x)) ?? []
  }

  getRoute(page: DuiPage, data: any, pageActualRoute: string) {
    let route = this.path
    for (const param of this.parameters) {
      let value = param.from === 'data' ? data[param.valueFieldName] : page.getParam(param, pageActualRoute)
      route = route.replace(`{${param.name}}`, value)
    }
    return route
  }
}
