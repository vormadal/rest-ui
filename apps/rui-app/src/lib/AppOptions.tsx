import React from 'react'
import DefaultListPage from '../components/rui/DefaultListPage'
import DefaultTextField from '../components/rui/DefaultTextField'
import { DataType, defaultDateFormatter, defaultDateTimeFormatter, defaultNumberFormatter, defaultTimeFormatter, RuiAnyActionSpec, RuiApiActionSpec, RuiButtonFieldSpec, RuiCompositeActionSpec, RuiFieldSpec, RuiLookupFieldSpec, RuiObjectFieldSpec, RuiRedirectActionSpec } from 'rui-core'
import { FieldComponentSelector, PageComponentSelector, RuiAppOptions } from '../core/app/RuiApp'
import { RuiAction } from '../core/app/actions/RuiAction'
import { RuiApiAction } from '../core/app/actions/RuiApiAction'
import { RuiCompositeAction } from '../core/app/actions/RuiCompositeAction'
import { RuiRedirectAction } from '../core/app/actions/RuiRedirectAction'
import { RuiArrayField } from '../core/app/fields/RuiArrayField'
import { RuiButtonField } from '../core/app/fields/RuiButtonField'
import { RuiDateTimeField } from '../core/app/fields/RuiDateTimeField'
import { RuiField } from '../core/app/fields/RuiField'
import { RuiLookupField } from '../core/app/fields/RuiLookupField'
import { RuiNumberField } from '../core/app/fields/RuiNumberField'
import { RuiObjectField } from '../core/app/fields/RuiObjectField'
import { RuiTextField } from '../core/app/fields/RuiTextField'
import { FieldProps } from './FieldProps'
import { PageProps } from './PageProps'
import { defaultFieldComponents } from './DefaultFieldComponents'
import { defaultPageComponents } from './DefaultPageComponents'

class NextAppOptions implements RuiAppOptions<React.FC<PageProps>, React.FC<FieldProps>> {
  getAction(
    spec: RuiAnyActionSpec,
    options: RuiAppOptions<React.FC<PageProps>, React.FC<FieldProps>>
  ): RuiAction<React.FC<PageProps>, React.FC<FieldProps>> {
    switch (spec.type) {
      case 'composite':
        return new RuiCompositeAction(spec as RuiCompositeActionSpec, options)
      case 'redirect':
        return new RuiRedirectAction(spec as RuiRedirectActionSpec)
      case 'api':
        return new RuiApiAction(spec as RuiApiActionSpec)
      default:
        throw new Error(`Unsupported action type: ${spec.type}`)
    }
  }
  getField(
    spec: RuiFieldSpec,
    options: RuiAppOptions<React.FC<PageProps>, React.FC<FieldProps>>
  ): RuiField<React.FC<PageProps>, React.FC<FieldProps>> {
    switch (spec.type) {
      case DataType.BUTTON:
        return new RuiButtonField(spec as RuiButtonFieldSpec, options)
      case DataType.LOOKUP:
        return new RuiLookupField(spec as RuiLookupFieldSpec, options)
      case DataType.OBJECT:
        return new RuiObjectField(spec as RuiObjectFieldSpec, options)
      case DataType.ARRAY:
        return new RuiArrayField(spec as RuiObjectFieldSpec, options)
      case DataType.STRING:
        return new RuiTextField(spec, options)
      case DataType.DATE:
        return new RuiDateTimeField(spec, DataType.DATE, options)
      case DataType.DATE_TIME:
        return new RuiDateTimeField(spec, DataType.DATE_TIME, options)
      case DataType.TIME:
        return new RuiDateTimeField(spec, DataType.TIME, options)
      case DataType.NUMBER:
        return new RuiNumberField(spec, options)
      case DataType.BOOLEAN:
      //TODO implement
      default:
        return new RuiTextField(spec, options)
        throw new Error(`Unsupported field type: ${spec.type}`)
    }
  }
  getFieldComponent({ dataType, name }: FieldComponentSelector): React.FC<FieldProps> {
    return (
      defaultFieldComponents.find((c) => c.names.includes(name) && c.types.includes(dataType))?.component ||
      DefaultTextField
    )
  }

  getPageComponent(selector: PageComponentSelector): React.FC<PageProps> {
    return (
      defaultPageComponents.find((c) => c.names.includes(selector.name) && c.types.includes(selector.type))
        ?.component || DefaultListPage
    )
  }
  getFormatter<V, O>(type: DataType): undefined | ((value: V, options: O) => string) {
    switch (type) {
      case DataType.DATE:
        return defaultDateFormatter as (value: V, options: O) => string
      case DataType.DATE_TIME:
        return defaultDateTimeFormatter as (value: V, options: O) => string
      case DataType.NUMBER:
        return defaultNumberFormatter as (value: V, options: O) => string
      case DataType.TIME:
        return defaultTimeFormatter as (value: V, options: O) => string
      case DataType.STRING:
      case DataType.BUTTON:
      case DataType.BOOLEAN:
      case DataType.LOOKUP:
      case DataType.OBJECT:
      case DataType.ARRAY:
      default:
        return undefined
    }
  }
}

export const nextAppOptions = new NextAppOptions()
