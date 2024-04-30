import { OpenAPIV3 } from 'openapi-types'
import type { DuiApiActionOptions } from '../dui-app/actions/DuiApiActionOptions'
import type { DuiParameterOptions, ParameterValueSource } from '../dui-app/DuiParamaterOptions'
import type { PageContext } from './context/PageContext'
import { HttpMethods } from './openApi/HttpMethods'

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
    const endpoint = this.context.document.paths[this.path]
    const result = endpoint ? this.context.resolveReference<OpenAPIV3.OperationObject>(endpoint[this.method]) : null

    if (result) {
      return result
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
      dataField: this.context.options.response.dataField,
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
    // TODO handle case when doing paging
    if (this.method === HttpMethods.GET) return this.context.options.response.dataField
    return this.context.options.request.dataField
  }

  getDataSourceParameters(parameterSource: ParameterValueSource = 'path'): DuiParameterOptions[] {
    return (
      this.schema?.parameters
        ?.map((x) => this.context.resolveReference<OpenAPIV3.ParameterObject>(x))
        .filter((x) => x.required && x.in === 'path') // we ignore query parameters for now
        .map((x) => ({
          name: x.name,
          valueFieldName: x.name, //TODO check if it exists in schema maybe?
          from: parameterSource // if there exists a source object we assume its data contains the parameter
        })) || []
    )
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

  get requestSchema() {
    const requestBody = this.context.resolveReference<OpenAPIV3.RequestBodyObject>(this.schema.requestBody)
    const schema =
      this.context.resolveReference<OpenAPIV3.SchemaObject>(
        requestBody?.content && requestBody?.content['application/json']?.schema
      ) || null
    if (schema.type === 'array') {
      return this.context.resolveReference<OpenAPIV3.NonArraySchemaObject>(
        (schema as OpenAPIV3.ArraySchemaObject).items as any
      )
    }
    return schema
  }

  get responseSchemaRef() {
    const responseBody = this.context.resolveReference<OpenAPIV3.ResponseObject>(this.schema.responses[200])
    return responseBody?.content && responseBody?.content['application/json']?.schema
  }
  get responseSchema() {
    const schema = this.context.resolveReference<OpenAPIV3.SchemaObject>(this.responseSchemaRef) || null

    if (schema.type === 'array') {
      return this.context.resolveReference<OpenAPIV3.NonArraySchemaObject>(
        (schema as OpenAPIV3.ArraySchemaObject).items as any
      )
    }
    return schema
  }

  get isResponseListType(): boolean {
    const schema = this.context.resolveReference<OpenAPIV3.SchemaObject>(this.responseSchemaRef) || null
    return schema?.type === 'array'
  }
}
