import { RuiButtonFieldSpec } from 'rui-core'
import { RuiAppOptions } from '../RuiApp'
import { RuiParameter } from '../RuiParameter'
import { RuiField } from './RuiField'

export class RuiButtonField<PC, FC> extends RuiField<PC, FC> {
  readonly paramaters: RuiParameter<PC, FC>[]
  constructor(private readonly buttonSpec: RuiButtonFieldSpec, options: RuiAppOptions<PC, FC>) {
    super(buttonSpec, options)
    this.paramaters = (buttonSpec.parameters || []).map((x) => new RuiParameter(x))
  }

  protected formatValue(): string {
    return ''
  }
  
  get linkTo(): string {
    return this.buttonSpec.linkTo
  }
}
