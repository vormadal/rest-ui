import { OpenAPIV3 } from 'openapi-types'
import type { DuiActionOptionsValues } from '../dui-app/actions/DuiActionOptionValues'
import type { DuiFieldOptions } from '../dui-app/DuiFieldOptions'
import type { DuiPageOptions } from '../dui-app/DuiPageOptions'
import { DuiPageType } from '../dui-app/DuiPageType'
import { FieldContext } from './context/FieldContext'
import type { PageContext } from './context/PageContext'
import type { EndpointBuilder } from './EndpointBuilder'
import { PageGroup } from './EndpointGroup'
import { FieldBuilder } from './FieldBuilder'
import { HttpMethods } from './openApi/HttpMethods'
import { DataType } from '../configurations/DataType'
import type { DuiApiActionOptions } from '../dui-app/actions/DuiApiActionOptions'

export class PageBuilder {
  constructor(public readonly endpoint: EndpointBuilder, public readonly context: PageContext) {
    this.group = new PageGroup(this.endpoint.resourceName, [])
  }

  get route(): string {
    switch (this.endpoint.method) {
      case HttpMethods.PUT:
        return this.endpoint.path + '/edit'
      case HttpMethods.POST:
        return this.endpoint.path + '/create'
      default:
        return this.endpoint.path
    }
  }

  private group: PageGroup
  set pageGroup(group: PageGroup | undefined) {
    if (group) {
      this.group = group
    }
  }

  get pageGroup(): PageGroup | null {
    return this.group
  }

  get pageType(): DuiPageType | null {
    switch (this.endpoint.method) {
      case HttpMethods.GET:
        // TODO handle paging cases or when data is in a nested property
        if (this.endpoint.isResponseListType) {
          //TODO move this to EndpointBuilder
          return DuiPageType.list
        }
        return DuiPageType.record
      case HttpMethods.PUT:
        return DuiPageType.updateForm
      case HttpMethods.POST:
        return DuiPageType.createForm
      default:
        return null
    }
  }

  get pageActions(): DuiActionOptionsValues[] {
    const actions: (DuiActionOptionsValues | undefined)[] = []

    if (this.pageType === DuiPageType.record) {
      actions.push(this.group.update?.getRedirectAction('Edit'))

      if (this.group.delete?.endpoint.submitAction) {
        actions.push({
          type: 'composite',
          label: 'Delete',
          actions: [this.group.delete.endpoint.submitAction, this.group.list?.getRedirectAction()].filter((x) => !!x)
        })
      }
    }

    if (this.pageType === DuiPageType.list && this.group.create) {
      actions.push(this.group.create.getRedirectAction('Create'))
    }

    return actions.filter((x) => !!x)
  }

  get fields(): DuiFieldOptions<any>[] {
    let schema = this.endpoint.responseSchema
    if (this.pageType && [DuiPageType.createForm, DuiPageType.updateForm].includes(this.pageType)) {
      schema = this.endpoint.requestSchema
    }

    const schemaFields = Object.keys(schema?.properties ?? {})
      .map(
        (name) =>
          new FieldBuilder(
            name,
            this.context.resolveReference<OpenAPIV3.SchemaObject>(schema!.properties![name]),
            new FieldContext(this)
          )
      )
      .filter((x) => !!x.type)
      .map((x) => x.duiFieldOptions)

    if (this.pageType === DuiPageType.list) {
      if (this.group.record) {
        schemaFields.push({
          type: DataType.BUTTON,
          displayName: 'Show',
          linkTo: this.group.record?.route,
          name: 'show',
          parameters: this.group.record?.endpoint.getDataSourceParameters('data')
        })

        if (this.group.update) {
          schemaFields.push({
            type: DataType.BUTTON,
            displayName: 'Edit',
            linkTo: this.group.update?.route,
            name: 'edit',
            parameters: this.group.update?.endpoint.getDataSourceParameters('data')
          })
        }
      }
    }
    return schemaFields
  }

  getRedirectAction(label?: string): DuiActionOptionsValues {
    return {
      type: 'redirect',
      urlTemplate: this.route,
      label: label,
      paramaters: this.endpoint.getDataSourceParameters() //TODO maybe page should have a list of parameters as well?
    }
  }

  get dataSourceAction(): DuiApiActionOptions | undefined {
    switch (this.pageType) {
      case DuiPageType.list:
      case DuiPageType.record:
        return this.endpoint.datasourceAction
      case DuiPageType.updateForm:
        return this.group.record?.dataSourceAction
    }

    return undefined
  }

  get submitAction(): DuiActionOptionsValues | undefined {
    switch (this.pageType) {
      case DuiPageType.createForm:
      case DuiPageType.updateForm:
        return {
          type: 'composite',
          label: 'Save',
          actions: [
            this.endpoint.submitAction,
            this.group.record?.getRedirectAction()
          ].filter((x) => !!x)
        }
    }
    return undefined
  }

  get duiPageOptions(): DuiPageOptions<any> {
    return {
      type: this.pageType!,
      route: this.route,
      actions: this.pageActions,
      dataSource: this.dataSourceAction,
      onSubmit: this.submitAction,
      fields: this.fields
    }
  }
}
