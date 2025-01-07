import { FieldComponentNames } from '../../../lib/DefaultComponentNames'
import { extractField } from '../../../lib/utils'
import { DataType, RuiFieldSpec } from 'rui-core'

import { RuiAppOptions } from '../RuiApp'

export abstract class RuiField<PC, FC> {
  readonly Component: FC

  constructor(protected readonly spec: RuiFieldSpec, private readonly options: RuiAppOptions<PC, FC>) {
    this.Component = options.getFieldComponent({
      dataType: spec.type,
      field: spec,
      name: spec.componentName || FieldComponentNames.Read_Default
    })
  }

  get name(): string {
    return this.spec.name
  }

  get displayName(): string {
    return this.spec.displayName
  }

  get hidden(): boolean {
    return this.spec.hidden === true
  }

  get type(): DataType {
    return this.spec.type
  }

  protected abstract formatValue(value: unknown): string

  getFormattedValue = (data: unknown) => {
    const value = this.getRawValue(data)
    return this.formatValue(value)
  }

  getRawValue = <T>(data: unknown) => {
    if (!data) return null
    return extractField<T>(data, this.name)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue = (data: unknown, value: any) => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(data as any)[this.name] = value
    }
    return data
  }
}
