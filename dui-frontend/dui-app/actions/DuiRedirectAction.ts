import { DuiParameter } from '../DuiParamater'
import type { DuiAction } from './DuiAction'
import type { DuiActionContext } from './DuiActionContext'
import type { DuiRedirectActionOptions } from './DuiRedirectActionOptions'

export class DuiRedirectAction implements DuiAction {
  urlTemplate: string
  parameters: DuiParameter[]
  _label?: string
  constructor({ label, urlTemplate, paramaters }: DuiRedirectActionOptions) {
    this._label = label
    this.urlTemplate = urlTemplate
    this.parameters = paramaters?.map((x) => new DuiParameter(x)) ?? []
  }
  get label(): string {
    return this._label ?? ''
  }

  getLink(context: DuiActionContext): string {
    let route = this.urlTemplate
    for (const param of this.parameters) {
      route = param.inject(route, context)
    }
    return route
  }

  async run(context: DuiActionContext): Promise<any> {
    context.router.push(this.getLink(context))
  }
}
