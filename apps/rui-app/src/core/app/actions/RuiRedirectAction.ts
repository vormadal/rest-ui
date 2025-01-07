import { RuiRedirectActionSpec } from 'rui-core'
import { RuiParameter } from '../RuiParameter'
import { RuiAction, RuiActionResponse } from './RuiAction'
import { RuiActionContext } from './RuiActionContext'

export class RuiRedirectAction<PC, FC> implements RuiAction<PC, FC> {
  readonly parameters: RuiParameter<PC, FC>[]
  constructor(private readonly spec: RuiRedirectActionSpec) {
    this.parameters = spec.paramaters?.map((x) => new RuiParameter(x)) ?? []
  }

  get label(): string {
    return this.spec.label ?? ''
  }

  get urlTemplate(): string {
    return this.spec.urlTemplate
  }

  getLink(context: RuiActionContext<PC, FC>): string {
    let route = this.urlTemplate
    for (const param of this.parameters) {
      route = param.inject(route, context)
    }
    return route
  }

  async run<T>(context: RuiActionContext<PC, FC>): Promise<RuiActionResponse<T>> {
    if (!context.navigateTo) {
      console.error('No navigateTo function found in context')
      return {}
    }
    context.navigateTo(this.getLink(context))
    return {}
  }
}
