import { DuiField } from './DuiField'
import type { DuiFieldOptions, DuiLookupFieldOptions } from './DuiFieldOptions'
import type { DuiActionContext } from './actions/DuiActionContext'
import { DuiApiAction } from './actions/DuiApiAction'
import { DuiRedirectAction } from './actions/DuiRedirectAction'
import type { IDuiConfig } from './config/DuiConfig'

export class DuiLookupField<Config extends IDuiConfig> extends DuiField {
  keyField: string
  public labelField: string
  _dataSource: DuiApiAction

  redirectAction?: DuiRedirectAction

  constructor(options: DuiFieldOptions<Config>, config: Config) {
    super(options, config)
    const { dataSource, keyField, labelField, redirectAction } = options as DuiLookupFieldOptions
    this.keyField = keyField
    this.labelField = labelField
    this._dataSource = new DuiApiAction(dataSource) // config.actionFactory([dataSource], config)[0] as DuiApiAction
    if (redirectAction) {
      this.redirectAction = new DuiRedirectAction(redirectAction)
    }
  }

  get dataSource() {
    return this._dataSource
  }
  format = (data: any) => {
    return ''
  }

  getInputValue = (data: any) => {
    return ''
  }

  getComponentProperties = (context: DuiActionContext, handleChange?: (field: DuiField, value: any) => void) => {
    return { field: this, context: context, children: this.displayName }
  }
}
