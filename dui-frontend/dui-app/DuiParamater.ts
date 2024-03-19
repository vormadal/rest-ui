import type { DuiParameterOptions } from './DuiParamaterOptions'
import type { DuiActionContext } from './actions/DuiActionContext'

export class DuiParameter {
  name: string

  from: 'data' | 'path' | 'query'
  valueFieldName: string

  constructor({ name, from, valueFieldName }: DuiParameterOptions) {
    this.name = name
    this.from = from || 'data'
    this.valueFieldName = valueFieldName
  }

  inject(routeTemplate: string, context: DuiActionContext) {
    let value = ''
    switch (this.from) {
      case 'data':
        const fields = this.valueFieldName.split('.')
        let tmp = context.data
        for (const field of fields) {
          tmp = tmp[field]
        }
        value = tmp
        break
      case 'path':
        value = context.page.getParam(this, context.path)
        break
      case 'query':
        const query = new URLSearchParams(context.path.substring(context.path.indexOf('?')))
        value = query.get(this.valueFieldName)?.toString() ?? ''
    }

    return routeTemplate.replace(`{${this.name}}`, value)
  }
}
