import { extractField } from '../../utils/objectUtils'
import { DuiParameter } from '../DuiParamater'
import type { DuiAction } from './DuiAction'
import type { DuiActionContext } from './DuiActionContext'
import type { DuiApiActionOptions } from './DuiApiActionOptions'

export class DuiApiAction implements DuiAction {
  method: string
  routeTemplate: string
  parameters: DuiParameter[]
  dataField?: string

  _label?: string

  pageNumberField?: string
  pageSizeField?: string
  totalItemCountField?: string

  get label() {
    return this._label ?? ''
  }

  constructor({ method, routeTemplate, dataField, paramaters, label, pagination }: DuiApiActionOptions) {
    this._label = label
    this.routeTemplate = routeTemplate
    this.method = method
    this.dataField = dataField
    this.parameters = paramaters?.map((x) => new DuiParameter(x)) ?? []

    this.pageNumberField = pagination?.pageNumberField
    this.pageSizeField = pagination?.pageSizeField
    this.totalItemCountField = pagination?.totalItemCountField
  }

  async run(context: DuiActionContext): Promise<{
    data: any | any[]
    page?: number
    size?: number
    total?: number
  }> {
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
        data: extractField(content, this.dataField),
        page: this.pageNumberField && extractField(content, this.pageNumberField),
        size: this.pageSizeField && extractField(content, this.pageSizeField),
        total: this.totalItemCountField && extractField(content, this.totalItemCountField)
      }
    } catch (e) {}
    return {
      data: null
    }
  }
}
