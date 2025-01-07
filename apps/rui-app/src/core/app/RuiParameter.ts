import { extractField } from '../../lib/utils'
import { RuiParameterSpec } from 'rui-core'
import { RuiActionContext } from './actions/RuiActionContext'

export class RuiParameter<PC, FC> {
  constructor(private readonly spec: RuiParameterSpec) {}

  get name(): string {
    return this.spec.name
  }

  get from(): 'data' | 'path' | 'query' {
    return this.spec.from || 'data'
  }

  get valueFieldName(): string {
    return this.spec.valueFieldName
  }

  inject(routeTemplate: string, context: RuiActionContext<PC, FC>) {
    let value: undefined | string = ''
    switch (this.from) {
      case 'data':
        value = extractField(context.data, this.valueFieldName)
        break
      case 'path':
        value = context.page.getParam(this, context.path)
        break
      case 'query':
        const query = new URLSearchParams(context.path.substring(context.path.indexOf('?')))
        value = query.get(this.valueFieldName)?.toString() ?? ''
    }

    return routeTemplate.replace(`{${this.name}}`, value || 'not-set')
  }
}
