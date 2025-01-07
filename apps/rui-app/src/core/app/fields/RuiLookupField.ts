import { RuiLookupFieldSpec } from 'rui-core'
import { RuiApiAction } from '../actions/RuiApiAction'
import { RuiRedirectAction } from '../actions/RuiRedirectAction'
import { RuiAppOptions } from '../RuiApp'
import { RuiField } from './RuiField'

export class RuiLookupField<PC, FC> extends RuiField<PC, FC> {
  readonly dataSource: RuiApiAction<PC, FC>

  redirectAction?: RuiRedirectAction<PC, FC>

  constructor(private readonly lookupSpec: RuiLookupFieldSpec, options: RuiAppOptions<PC, FC>) {
    super(lookupSpec, options)
    this.dataSource = new RuiApiAction(lookupSpec.dataSource) // config.actionFactory([dataSource], config)[0] as DuiApiAction
    if (lookupSpec.redirectAction) {
      this.redirectAction = new RuiRedirectAction(lookupSpec.redirectAction)
    }
  }

  get keyField(): string {
    return this.lookupSpec.keyField
  }

  get labelField(): string {
    return this.lookupSpec.labelField
  }

  protected formatValue(): string {
    return ''
  }
}
