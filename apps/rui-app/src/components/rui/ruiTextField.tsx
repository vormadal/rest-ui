// text field component based on input component
import * as React from 'react'
import RuiInput, { RuiInputProps } from './ruiInput'

const RuiTextField: React.FC<Omit<RuiInputProps, 'type'>> = (props) => {
  return (
    <RuiInput
      type="text"
      {...props}
    />
  )
}

export default RuiTextField
