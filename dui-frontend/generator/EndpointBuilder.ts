import type { OpenAPIV3 } from 'openapi-types'
import type { DuiApiActionOptions } from '../dui-app/actions/DuiApiActionOptions'
import type { DuiParameterOptions, ParameterValueSource } from '../dui-app/DuiParamaterOptions'
import type { PageContext } from './context/PageContext'
import { HttpMethods } from './openApi/HttpMethods'
import { OperationSchema } from './openApi/OperationSchema'
import { PagingBuilder } from './PagingBuilder'

export class EndpointBuilder {
  constructor(
    public readonly path: string,
    public readonly method: HttpMethods,
    private readonly context: PageContext
  ) {}

  matches(path: string, method: HttpMethods) {
    return this.path === path && this.method === method
  }

  get resourceName(): string {
    const segments = this.path.split('/').filter((x) => !x.startsWith('{'))
    return segments[segments.length - 1]
  }

  get schema() {
    const endpoint = this.context.document.paths[this.path] as OpenAPIV3.PathItemObject
    if (endpoint && endpoint[this.method]) {
      return new OperationSchema(endpoint[this.method] as OpenAPIV3.OperationObject, this.context)
    }

    throw new Error(`could not find schema for ${this.method} ${this.path}`)
  }

  get datasourceAction(): DuiApiActionOptions | undefined {
    if (this.method !== HttpMethods.GET) {
      return undefined
    }

    return {
      type: 'api',
      method: 'GET',
      routeTemplate: this.path,
      dataField: this.isPagedType ? this.context.options.pagingResponse.dataField : this.context.options.response.dataField,
      paramaters: this.getDataSourceParameters()
    }
  }

  get submitAction(): DuiApiActionOptions | undefined {
    if (![HttpMethods.DELETE, HttpMethods.POST, HttpMethods.PUT].includes(this.method)) {
      return undefined
    }

    return {
      type: 'api',
      method: this.mapMethod(this.method),
      routeTemplate: this.path,
      dataField: this.context.options.request.dataField,
      label: this.label,
      paramaters: this.getDataSourceParameters()
    }
  }

  buildApiAction(): DuiApiActionOptions {
    return {
      type: 'api',
      method: this.mapMethod(this.method),
      routeTemplate: this.path,
      dataField: this.getDataField(),
      paramaters: this.getDataSourceParameters(),
      label: this.label
    }
  }

  get label(): string | undefined {
    switch (this.method) {
      case HttpMethods.PUT:
        return 'Update'
      case HttpMethods.POST:
        return 'Create'
      case HttpMethods.DELETE:
        return 'Delete'
      case HttpMethods.GET:
      default:
        return undefined
    }
  }

  getDataField() {
    if (this.method === HttpMethods.GET) {
      return this.isPagedType ? this.context.options.pagingResponse.dataField : this.context.options.response.dataField
    }
    return this.context.options.request.dataField
  }

  getDataSourceParameters(parameterSource: ParameterValueSource = 'path'): DuiParameterOptions[] {
    return this.schema.parameters
      .filter((x) => x.required && x.in === 'path') // we ignore query parameters for now
      .map((x) => ({
        name: x.name,
        valueFieldName: x.name, //TODO check if it exists in schema maybe?
        from: parameterSource // if there exists a source object we assume its data contains the parameter
      }))
  }

  private mapMethod(method: HttpMethods): 'GET' | 'POST' | 'PUT' | 'DELETE' {
    switch (method) {
      case HttpMethods.GET:
        return 'GET'
      case HttpMethods.PUT:
        return 'PUT'
      case HttpMethods.POST:
        return 'POST'
      case HttpMethods.DELETE:
        return 'DELETE'
    }
  }

  get isPagedType(): boolean {
    return !!this.pagingBuilder
  }

  get pagingSchema() {
    if(!this.isPagedType) return null

    return this.schema.response?.schema.properties
  }

  get pagingBuilder() {
    const pageSize = this.schema.parameters?.find((x) => x.couldBe('size'))
    const pageNumber = this.schema.parameters?.find((x) => x.couldBe('number'))

    if (pageSize && pageNumber) {
      return new PagingBuilder(pageSize, pageNumber)
    }
    return null
  }
}
