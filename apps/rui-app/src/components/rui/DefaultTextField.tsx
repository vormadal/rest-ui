// text field component based on input component
import * as React from 'react'
import { FieldProps } from '../../lib/FieldProps'
import RuiInput from './ruiInput'

export default function DefaultTextField({ field, data, handleChange }: FieldProps) {
  return (
    <RuiInput
      type={field.type}
      value={field.getRawValue(data) || ''}
      name={field.name}
      label={field.displayName}
      onChange={(e) => handleChange(field.setValue(data, e.target.value))}
    />
  )
}
