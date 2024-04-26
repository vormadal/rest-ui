import { OpenAPIV3, type OpenAPI } from 'openapi-types'
import { DataType } from '../configurations/DataType'
import type { DuiAppOptions } from '../dui-app/DuiAppOptions'
import type { DuiFieldOptions } from '../dui-app/DuiFieldOptions'
import type { DuiPageOptions } from '../dui-app/DuiPageOptions'
import { DuiPageType } from '../dui-app/DuiPageType'
import type { DuiParameterOptions } from '../dui-app/DuiParamaterOptions'
import type { DuiButtonActionOptions } from '../dui-app/actions/DuiButtonActionOptions'
import { HttpMethods } from './openApi/HttpMethods'
import type { AnySchema, SchemaComponentMap } from './openApi/OpenApiTypes'

type ParserOptions = {
  request: {
    dataField?: string
  }
  response: {
    dataField?: string
  }
}

const defaultOptions: ParserOptions = {
  request: {},
  response: {}
}
export class OpenApiParser {
  private readonly schemas: SchemaComponentMap
  private options: ParserOptions = defaultOptions
  constructor(private readonly document: OpenAPIV3.Document) {
    this.schemas = this.getSchemaComponents(document)
  }

  parse(options: ParserOptions = defaultOptions): DuiAppOptions {
    this.options = options
    const version = this.document.openapi
    if (version.startsWith('3')) {
      return this.parseV3()
    }

    throw new Error('this document type cannot be handled')
  }

  private parseV3(): DuiAppOptions {
    const pages = this.getPages()
    return {
      baseUrl: this.document.servers ? this.document.servers[0].url : '/',
      dashboard: {
        pages: pages.filter((x) => x.type === DuiPageType.list).map((x) => x.route)
      },
      pages: pages
    }
  }

  private getOperation(path: string, method: HttpMethods): OpenAPIV3.OperationObject | null {
    const endpoint = this.document.paths[path]
    return endpoint ? this.resolveReferenceObject<OpenAPIV3.OperationObject>(endpoint[method]) : null
  }

  private getPages(): DuiPageOptions[] {
    if (!this.document?.paths) return []

    const paths = Object.keys(this.document.paths)
    const pages: DuiPageOptions[] = []

    const relevantMethods = [HttpMethods.GET, HttpMethods.POST, HttpMethods.PUT]

    for (const path of paths) {
      const methods = Object.keys(this.document.paths[path] || {}) as HttpMethods[]

      for (const method of methods.filter((x) => relevantMethods.includes(x))) {
        const source = this.document.paths[path]![method] as OpenAPIV3.OperationObject
        const type = this.resolveType(method, source)

        switch (type) {
          case DuiPageType.list:
            pages.push(this.createListPage(path, method, source))
            break
          case DuiPageType.record:
            pages.push(this.createRecordPage(path, method, source))
            break
          case DuiPageType.createForm:
            pages.push(this.createCreateFormPage(path, method, source))
            break
          case DuiPageType.updateForm:
            pages.push(this.createUpdateFormPage(path, method, source))
            break
        }
      }
    }

    return pages
  }

  private createCreateFormPage(path: string, method: HttpMethods, source: OpenAPIV3.OperationObject): DuiPageOptions {
    const pageType = this.resolveType(method, source)
    return {
      type: DuiPageType.createForm,
      route: this.resolveRoute(path, method),
      fields: this.resolveFields(pageType, source),
      onSubmit: {
        type: 'composite',
        actions: [
          {
            type: 'api',
            method: 'POST',
            routeTemplate: path
            //TODO this might have some global variables as paramaters that we need to handle
          },
          {
            type: 'redirect',
            urlTemplate: this.resolveRoute(path, HttpMethods.GET),
            paramaters: this.resolveDataSourceParameters(source)
          }
        ]
      }
    }
  }

  private createUpdateFormPage(path: string, method: HttpMethods, source: OpenAPIV3.OperationObject): DuiPageOptions {
    const pageType = this.resolveType(method, source)
    return {
      type: DuiPageType.updateForm,
      route: this.resolveRoute(path, method),
      fields: this.resolveFields(pageType, source),
      dataSource: {
        method: 'GET',
        dataField: this.options.response.dataField, //TODO
        routeTemplate: path, //TODO the put endpoint might be different from the get endpoint that we need here
        type: 'api',
        paramaters: this.resolveDataSourceParameters(source)
      },
      onSubmit: {
        type: 'composite',
        actions: [
          {
            type: 'api',
            method: 'PUT',
            routeTemplate: path,
            paramaters: this.resolveDataSourceParameters(source) //TODO this might have to be different?
          },
          {
            type: 'redirect',
            urlTemplate: this.resolveRoute(path, HttpMethods.GET),
            paramaters: this.resolveDataSourceParameters(source)
          }
        ]
      }
    }
  }

  private createRecordPage(path: string, method: HttpMethods, source: OpenAPIV3.OperationObject): DuiPageOptions {
    const deleteAction = this.getOperation(path, HttpMethods.DELETE)
    const updateAction = this.getOperation(path, HttpMethods.PUT)

    const actions: DuiButtonActionOptions[] = []
    if (deleteAction) {
      actions.push({
        label: 'Delete',
        method: 'DELETE',
        routeTemplate: path,
        type: 'api',
        dataField: this.options.response.dataField,
        paramaters: [
          {
            name: 'id',
            valueFieldName: 'id',
            from: 'path'
          }
        ]
      })
    }

    if (updateAction) {
      actions.push({
        label: 'Edit',
        type: 'redirect',
        urlTemplate: this.resolveRoute(path, HttpMethods.PUT),
        paramaters: [
          {
            name: 'id',
            valueFieldName: 'id',
            from: 'path'
          }
        ]
      })
    }
    return {
      type: DuiPageType.record,
      route: this.resolveRoute(path, method),
      fields: this.resolveFields(DuiPageType.record, source),
      dataSource: {
        method: 'GET',
        dataField: this.options.response.dataField, //TODO
        routeTemplate: path,
        type: 'api',
        paramaters: this.resolveDataSourceParameters(source)
      },
      actions: actions
    }
  }

  private resolveDataSourceParameters(source: OpenAPIV3.OperationObject): DuiParameterOptions[] {
    return (source.parameters ?? [])
      .map((x) => this.resolveReferenceObject<OpenAPIV3.ParameterObject>(x))
      .filter((x) => x.required)
      .map((x) => ({
        name: x.name,
        valueFieldName: x.name, //TODO make smarter and search the schema fields or origin path
        from: x.in === 'path' ? 'path' : 'data' //TODO this might not always be the case
      }))
  }

  private createListPage(path: string, method: HttpMethods, source: OpenAPIV3.OperationObject): DuiPageOptions {
    const fields = this.resolveFields(DuiPageType.list, source)
    const showOperationPath = `${path}/{id}`

    source.parameters

    const showRoute = this.resolveRoute(showOperationPath, HttpMethods.GET)
    const editRoute = this.resolveRoute(showOperationPath, HttpMethods.PUT)

    const showOperation = this.getOperation(showOperationPath, HttpMethods.GET)
    const editOperation = this.getOperation(showOperationPath, HttpMethods.PUT)

    if (showOperation) {
      fields.push({
        type: DataType.BUTTON,
        linkTo: showRoute,
        displayName: 'Show',
        name: 'show',
        parameters: [
          {
            name: 'id',
            valueFieldName: 'id',
            from: 'data'
          }
        ]
      })
    }

    if (editOperation) {
      fields.push({
        type: DataType.BUTTON,
        linkTo: editRoute,
        displayName: 'Edit',
        name: 'edit',
        parameters: [
          {
            name: 'id',
            valueFieldName: 'id',
            from: 'data'
          }
        ]
      })
    }

    return {
      type: DuiPageType.list,
      route: this.resolveRoute(path, method),
      fields: fields,
      dataSource: {
        method: 'GET',
        dataField: this.options.response.dataField, //TODO make this dynamic,
        routeTemplate: path,
        type: 'api'
        // paramaters: this.resolveDataSourceParamaters(path) //TODO handle parameters
      }
    }
  }

  private resolveProperty(
    name: string,
    reference?: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | null
  ): DuiFieldOptions {
    const schema = this.resolveReferenceObject<OpenAPIV3.SchemaObject>(reference)
    const type = this.resolvePropertyType(schema)

    return {
      name: name,
      displayName: name,
      type: type
    }
  }

  private resolvePropertyType(schema: OpenAPIV3.SchemaObject) {
    switch (schema.type) {
      case 'string':
        switch (schema.format) {
          //TODO check if these values are correct
          case 'date-time':
            return DataType.DATE_TIME
          case 'date':
            return DataType.DATE
          case 'time':
            return DataType.TIME
          default:
            return DataType.STRING
        }
      case 'integer':
      case 'number':
        return DataType.NUMBER
      case 'boolean':
        return DataType.BOOLEAN
      default:
        throw new Error(`Property type ${schema.type} is not yet implemented`)
    }
  }

  private resolveFields(type: DuiPageType, source: OpenAPIV3.OperationObject): DuiFieldOptions[] {
    const responseBody = this.resolveReferenceObject<OpenAPIV3.ResponseObject>(source.responses[200])
    let schema = this.resolveReferenceObject<OpenAPIV3.SchemaObject>(
      responseBody?.content && responseBody?.content['application/json']?.schema
    )
    if (schema?.type === 'array') {
      schema = this.resolveReferenceObject<OpenAPIV3.NonArraySchemaObject>(
        (schema as OpenAPIV3.ArraySchemaObject).items as any
      )
    }

    switch (type) {
      case DuiPageType.list:
      case DuiPageType.record:
      case DuiPageType.updateForm:
        return Object.keys(schema?.properties ?? {}).map((name) => {
          return this.resolveProperty(name, schema?.properties && schema?.properties[name])
        })
      case DuiPageType.createForm:
    }

    return []
  }

  private resolveType(method: HttpMethods, source: OpenAPIV3.OperationObject): DuiPageType {
    switch (method) {
      case HttpMethods.GET:
        const responseBody = this.resolveReferenceObject<OpenAPIV3.ResponseObject>(source.responses[200])
        const responseSchema = this.resolveReferenceObject<OpenAPIV3.SchemaObject>(
          responseBody?.content && responseBody?.content['application/json']?.schema
        )
        // TODO handle paging cases or when data is in a nested property
        if (responseSchema?.type === 'array') {
          return DuiPageType.list
        }
        return DuiPageType.record
      case HttpMethods.PUT:
        return DuiPageType.updateForm
      case HttpMethods.POST:
        return DuiPageType.createForm
      default:
        throw new Error(`there is no page type for ${method} requests`)
    }
  }

  private resolveRoute(path: string, method: HttpMethods): string {
    switch (method) {
      case HttpMethods.PUT:
        return path + '/edit'
      case HttpMethods.POST:
        return path + '/create'
      default:
        return path
    }
  }

  resolveReferenceObject<T>(obj?: T | OpenAPIV3.ReferenceObject | null): T {
    if (!obj) throw new Error('reference is null')
    if ((obj as OpenAPIV3.ReferenceObject).$ref) {
      const ref = (obj as OpenAPIV3.ReferenceObject).$ref
      const component = this.schemas.get(ref)
      if ((component as OpenAPIV3.ReferenceObject).$ref) {
        return this.resolveReferenceObject<T>(component as OpenAPIV3.ReferenceObject)
      }
      return component as T
    }
    return obj as T
  }

  getSchemaComponents(document: OpenAPIV3.Document): SchemaComponentMap {
    const map: SchemaComponentMap = new Map()

    function resolveReferences(schemas: { [key: string]: AnySchema } | undefined, prefix: string) {
      const keys = Object.keys(schemas ?? {})
      if (!schemas) return
      for (const key of keys) {
        const schema = schemas[key]
        if (schema) {
          map.set(`${prefix}${key}`, schema)
        }
      }
    }

    resolveReferences(document?.components?.schemas, '#/components/schemas/')
    resolveReferences(document?.components?.requestBodies, '#/components/requestBodies/')
    resolveReferences(document?.components?.responses, '#/components/responses')

    return map
  }
}
