import { RuiPageSpec, RuiPageType } from 'rui-core'
import { RuiAction } from './actions/RuiAction'
import { RuiApiAction } from './actions/RuiApiAction'
import { RuiAppOptions } from './RuiApp'
import { RuiField } from './fields/RuiField'
import { RuiParameter } from './RuiParameter'
import { RuiRedirectAction } from './actions/RuiRedirectAction'

export class RuiPage<PC, FC> {
  readonly fields: RuiField<PC, FC>[] = []
  readonly Component: PC
  readonly dataSource?: RuiApiAction<PC, FC>
  readonly onSubmit?: RuiAction<PC, FC>
  readonly actions: RuiAction<PC, FC>[] = []
  readonly viewLink?: RuiRedirectAction<PC, FC>
  readonly editLink?: RuiRedirectAction<PC, FC>
  readonly displayName: string = this.spec.displayName || this.spec.route

  constructor(private readonly spec: RuiPageSpec, private readonly options: RuiAppOptions<PC, FC>) {
    this.fields = spec.fields.map((x) => options.getField(x, options))
    this.Component = options.getPageComponent({
      type: spec.type,
      name: 'default', // TODO allow overrides
      page: spec
    })
    this.onSubmit = spec.onSubmit ? options.getAction(spec.onSubmit, options) : undefined
    this.dataSource = spec.dataSource ? new RuiApiAction(spec.dataSource) : undefined
    this.actions = spec.actions ? spec.actions.map((x) => options.getAction(x, options)) : []
    this.viewLink = spec.viewLink ? new RuiRedirectAction(spec.viewLink) : undefined
    this.editLink = spec.editLink ? new RuiRedirectAction(spec.editLink) : undefined
  }

  get route(): string {
    return this.spec.route
  }

  get type(): RuiPageType {
    return this.spec.type
  }

  matches = (route: string): boolean => {
    const routeParts = route.split('/').filter((x) => !!x)
    const pageRouteParts = this.route.split('/').filter((x) => !!x)

    if (routeParts.length !== pageRouteParts.length) return false

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i] === pageRouteParts[i]) {
        continue
      }
      if (/\{.+\}/.test(pageRouteParts[i])) {
        continue
      }
      return false
    }

    return true
  }

  getParam = (param: RuiParameter<PC, FC>, route: string): string => {
    const routeParts = route.split('/').filter((x) => !!x)
    const templateParts = this.route.split('/').filter((x) => !!x)

    const templatePart = templateParts.find((x) => x === `{${param.valueFieldName}}`)
    const index = templatePart ? templateParts.indexOf(templatePart) : -1

    return index >= 0 ? routeParts[index] : ''
  }

  get visibleFields(): RuiField<PC, FC>[] {
    return this.fields.filter((x) => !x.hidden)
  }
}
