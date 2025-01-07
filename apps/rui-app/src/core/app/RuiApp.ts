import { DataType, RuiAnyActionSpec, RuiAppSpec, RuiFieldSpec, RuiPageSpec, RuiPageType } from 'rui-core'
import { RuiAction } from './actions/RuiAction'
import { RuiField } from './fields/RuiField'
import { RuiPage } from './RuiPage'

export class RuiApp<PC, FC> {
  readonly pages: RuiPage<PC, FC>[]
  constructor(private readonly spec: RuiAppSpec, private readonly options: RuiAppOptions<PC, FC>) {
    this.pages = spec.pages.map((x) => new RuiPage(x, options))
  }

  get baseUrl(): string {
    return this.spec.baseUrl
  }

  getPage = (route: string): undefined | RuiPage<PC, FC> => {
    return this.pages.find((x) => x.matches(route))
  }

  fetch(method: string, route: string, data?: unknown) {
    return fetch(`${this.baseUrl}${route.startsWith('/') ? '' : '/'}${route}`, {
      method: method,
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export interface FieldComponentSelector {
  /**
   * The name of the component to use for rendering the field
   */
  name: string

  /**
   * The data type for the field
   */
  dataType: DataType

  /**
   * the full field spec, which can be used for selecting custom components.
   * This is not used by the default implementation
   */
  field: RuiFieldSpec
}

export interface PageComponentSelector {
  type: RuiPageType
  name: string
  page: RuiPageSpec
}

export interface RuiAppOptions<PC, FC> {
  getFieldComponent(selector: FieldComponentSelector): FC
  getPageComponent(selector: PageComponentSelector): PC
  getFormatter(type: DataType): undefined | ((value: unknown, options: unknown) => string)
  getAction(spec: RuiAnyActionSpec, options: RuiAppOptions<PC, FC>): RuiAction<PC, FC>
  getField(spec: RuiFieldSpec, options: RuiAppOptions<PC, FC>): RuiField<PC, FC>
}
