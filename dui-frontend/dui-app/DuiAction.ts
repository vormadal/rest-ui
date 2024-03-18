import type { Router } from 'vue-router'
import type { DuiActionOptions } from './DuiActionOptions'
import type { DuiConfig } from './config/DuiConfig'
import type { DuiParameter } from '../configurations/ButtonOptions'

export class DuiAction<Config extends DuiConfig = DuiConfig> {
  //TODO type and maybe multiple steps? right everything is just links

  to: string
  label: string

  dataField?: string
  parameters: DuiParameter[]

  constructor({ to, label, parameters, dataField }: DuiActionOptions<Config>) {
    this.to = to
    this.label = label
    this.parameters = parameters || []
    this.dataField = dataField
  }

  async run(router: Router, data: any): Promise<void> {
    const actualData = this.dataField ? data[this.dataField] : data
    let route = this.to
    for (const param of this.parameters) {
      // TODO handle formatting of data fields, e.g. if date
      route = route.replace(`{${param.name}}`, actualData[param.fieldName])
    }
    router.push(route)
  }
}
