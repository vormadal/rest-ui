import { FieldProps } from '../../lib/FieldProps'

export default function DefaultTableCell({ field, data }: FieldProps) {
  return <>{field.getFormattedValue(data)}</>
}
