import { FunctionComponent } from 'react'
import DefaultTableCell from '../components/rui/DefaultTableCell'
import DefaultTextField from '../components/rui/DefaultTextField'
import { DataType } from 'rui-core'
import { FieldComponentNames } from './DefaultComponentNames'
import DefaultCheckboxField from '../components/rui/DefaultCheckboxField'

interface Type {
  names: string[]
  types: DataType[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FunctionComponent<any>
}

const AllDataTypes: DataType[] = [
  DataType.STRING,
  DataType.NUMBER,
  DataType.BOOLEAN,
  DataType.DATE,
  DataType.TIME,
  DataType.DATE_TIME,
  DataType.ARRAY,
  DataType.OBJECT,
  DataType.LOOKUP
]

export const defaultFieldComponents: Type[] = [
  {
    names: [FieldComponentNames.Write_Default, FieldComponentNames.Read_Default],
    types: [DataType.BOOLEAN],
    component: DefaultCheckboxField
  },
  {
    names: [FieldComponentNames.Read_Default, FieldComponentNames.Write_Default],
    types: [...AllDataTypes],
    component: DefaultTextField
  },
  {
    names: [FieldComponentNames.Read_TableCell, FieldComponentNames.Write_TableCell],
    types: [...AllDataTypes],
    component: DefaultTableCell
  }
]
