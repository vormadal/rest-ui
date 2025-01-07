import { RuiApiActionSpec } from 'rui-core'
import { extractField } from '../../../lib/utils'
import { RuiParameter } from '../RuiParameter'
import { RuiAction, RuiActionResponse } from './RuiAction'
import { RuiActionContext } from './RuiActionContext'

export class RuiApiAction<PC, FC> implements RuiAction<PC, FC> {
  method: string
  routeTemplate: string
  parameters: RuiParameter<PC, FC>[]
  dataField?: string

  _label?: string

  pageNumberField?: string
  pageSizeField?: string
  totalItemCountField?: string

  get label() {
    return this._label ?? ''
  }

  constructor({ method, routeTemplate, dataField, paramaters, label, pagination }: RuiApiActionSpec) {
    this._label = label
    this.routeTemplate = routeTemplate
    this.method = method
    this.dataField = dataField
    this.parameters = paramaters?.map((x) => new RuiParameter(x)) ?? []

    this.pageNumberField = pagination?.pageNumberField
    this.pageSizeField = pagination?.pageSizeField
    this.totalItemCountField = pagination?.totalItemCountField
  }

  async run<T>(context: RuiActionContext<PC, FC>): Promise<RuiActionResponse<T>> {
    let route = this.routeTemplate
    for (const param of this.parameters) {
      route = param.inject(route, context)
    }

    //TODO make it smarter than just string concat?
    if (context.query?.page) {
      route += `?${this.pageNumberField}=${context.query.page}&${this.pageSizeField}=${context.query.size || 10}`
    }
    const data = ['POST', 'PUT'].includes(this.method) ? context.data : undefined
    const response = await context.app.fetch(this.method, route, data)
    try {
      const content = await response.json()

      return {
        data: extractField<T>(content, this.dataField),
        page: this.pageNumberField ? extractField<number>(content, this.pageNumberField) : undefined,
        size: this.pageSizeField ? extractField<number>(content, this.pageSizeField) : undefined,
        total: this.totalItemCountField ? extractField<number>(content, this.totalItemCountField) : undefined
      }
    } catch {}
    return {
      data: undefined
    }
  }
}
