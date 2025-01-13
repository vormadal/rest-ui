import { RuiAnyActionSpec, RuiApiActionSpec, RuiCompositeActionSpec, RuiFieldSpec, RuiPageSpec, RuiPageType, RuiParameterValueSource, RuiRedirectActionSpec } from '../../../../../libs/rui-core/src'
import { FieldContext } from './context/FieldContext'
import type { PageContext } from './context/PageContext'
import type { EndpointBuilder } from './EndpointBuilder'
import { PageGroup } from './EndpointGroup'
import { FieldBuilder } from './FieldBuilder'
import { HttpMethods } from './openApi/HttpMethods'

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

  get pageType(): RuiPageType | null {
    switch (this.endpoint.method) {
      case HttpMethods.GET:
        // TODO handle paging cases or when data is in a nested property
        if (this.endpoint.isPagedType || this.endpoint.schema.response?.isList) {
          //TODO move this to EndpointBuilder
          return RuiPageType.list
        }
        return RuiPageType.view
      case HttpMethods.PUT:
        return RuiPageType.edit
      case HttpMethods.POST:
        return RuiPageType.create
      default:
        return null
    }
  }

  get pageActions(): RuiAnyActionSpec[] {
    const actions: (RuiAnyActionSpec | undefined)[] = []

    if (this.pageType === RuiPageType.view) {
      actions.push(this.group.update?.getRedirectAction('Edit'))

      if (this.group.delete?.endpoint.submitAction) {
        actions.push({
          type: 'composite',
          label: 'Delete',
          actions: [this.group.delete.endpoint.submitAction, this.group.list?.getRedirectAction()].filter((x) => !!x)
        })
      }
    }

    if (this.pageType === RuiPageType.list && this.group.create) {
      actions.push(this.group.create.getRedirectAction('Create'))
    }

    return actions.filter((x) => !!x)
  }

  get fields(): RuiFieldSpec[] {
    const useRequestSchema = this.pageType && [RuiPageType.create, RuiPageType.edit].includes(this.pageType)

    const schema = useRequestSchema
      ? this.endpoint.schema.requestBody
      : this.endpoint.schema.pagingSchema || this.endpoint.schema.response

    const schemaFields =
      schema?.properties
        .map((property) => new FieldBuilder(property, new FieldContext(this, property.name), this.pageType))
        .filter((x) => !!x.type)
        .map((x) => x.spec) || []

    return schemaFields
  }

  getRedirectAction(label?: string, parameterSource?: RuiParameterValueSource): RuiRedirectActionSpec {
    return {
      type: 'redirect',
      urlTemplate: this.route,
      label: label,
      paramaters: this.endpoint.getDataSourceParameters(parameterSource) //TODO maybe page should have a list of parameters as well?
    }
  }

  get dataSourceAction(): RuiApiActionSpec | undefined {
    switch (this.pageType) {
      case RuiPageType.list:
      case RuiPageType.view:
        return this.endpoint.datasourceAction
      case RuiPageType.edit:
        return this.group.record?.dataSourceAction
    }

    return undefined
  }

  get submitAction(): RuiApiActionSpec | RuiCompositeActionSpec | undefined {
    switch (this.pageType) {
      case RuiPageType.create:
      case RuiPageType.edit:
        return {
          type: 'composite',
          label: 'Save',
          actions: [this.endpoint.submitAction, this.group.record?.getRedirectAction()].filter((x) => !!x)
        }
    }
    return undefined
  }

  get spec(): RuiPageSpec {
    return {
      type: this.pageType!,
      route: this.route,
      actions: this.pageActions,
      dataSource: this.dataSourceAction,
      onSubmit: this.submitAction,
      fields: this.fields,
      viewLink: !this.group.record
        ? undefined
        : {
            type: 'redirect',
            urlTemplate: this.group.record.route,
            paramaters: this.group.record.endpoint.getDataSourceParameters('data'),
            label: 'View'
          },
      editLink: !this.group.update
        ? undefined
        : {
            type: 'redirect',
            urlTemplate: this.group.update.route,
            paramaters: this.group.update.endpoint.getDataSourceParameters('data'),
            label: 'Edit'
          }
    }
  }
}
