import { DataType } from '../../configurations/DataType'
import type { DuiActionContext } from '../../dui-app/actions/DuiActionContext'
import type { DuiField } from '../../dui-app/DuiField'
import { DuiPageType } from '../../dui-app/DuiPageType'

interface Props {
  context: DuiActionContext
  field: DuiField
  data: any
  handleChange?: (field: DuiField, value: any) => void
}
export default function FieldSelector({ context, field, data, handleChange }: Props) {
  if (
    field.type === DataType.BUTTON ||
    field.type === DataType.LOOKUP || //TODO all fields should have a component instead of just returning field.format(data)
    [DuiPageType.createForm, DuiPageType.updateForm].includes(context.page.type)
  ) {
    const FieldComponent = field.component
    if (!FieldComponent) {
      return (
        <p>
          field has no component {field.name} of type {field.type}
        </p>
      )
    }

    const { children, ...props } = field.getComponentProperties({ ...context, data }, handleChange)
    return <FieldComponent {...props}>{children}</FieldComponent>
  }

  return field.format(data)
}
