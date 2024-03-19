import { DuiParameter } from '../DuiParamater'
import type { DuiConfig } from '../config/DuiConfig'
import type { DuiAction } from './DuiAction'
import type { DuiActionContext } from './DuiActionContext'
import type { DuiRedirectActionOptions } from './DuiRedirectActionOptions'

export class DuiRedirectAction<Config extends DuiConfig = DuiConfig> implements DuiAction<Config> {
  urlTemplate: string
  parameters: DuiParameter[]

  constructor({ urlTemplate, paramaters }: DuiRedirectActionOptions) {
    this.urlTemplate = urlTemplate
    this.parameters = paramaters?.map((x) => new DuiParameter(x)) ?? []
  }

  async run(context: DuiActionContext): Promise<any> {
    let route = this.urlTemplate
    for (const param of this.parameters) {
      route = param.inject(route, context)
    }
    context.router.push(route)
  }
}
