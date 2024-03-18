import { NuxtLink } from '#components'
import type { ButtonOptions } from '../../configurations/ButtonOptions'
import { DataType } from '../../configurations/DataType'
import type { DuiApp } from '../../dui-app/DuiApp'
import type { DuiField } from '../../dui-app/DuiField'
import type { DuiPage } from '../../dui-app/DuiPage'
import { DuiPageType } from '../../dui-app/DuiPageType'

interface Props {
  app: DuiApp
  page: DuiPage
  field: DuiField
  data: any
  handleChange?: (field: DuiField, value: any) => void
}
export default function FieldSelector({ app, page, field, data, handleChange }: Props) {
  if (field.type === DataType.BUTTON) {
    //TODO maybe extract this to field configuration to have an optional component
    const options = field.options as ButtonOptions
    let route = options.linkTo
    for (const param of options.parameters || []) {
      route = route.replace(`{${param.name}}`, data[param.fieldName])
    }
    console.log('route', options.linkTo, route)
    return <NuxtLink to={route}>{field.displayName}</NuxtLink>
  }

  if ([DuiPageType.createForm, DuiPageType.updateForm].includes(page.type)) {
    const FieldComponent = field.component
    if(!FieldComponent){
      return <p>field has no component {field.name} of type {field.type}</p>
    }
    return (
      <FieldComponent
        field={field}
        value={field.getInputValue(data)}
        handleChange={handleChange}
      />
    )
  }

  return field.format(data)
}
