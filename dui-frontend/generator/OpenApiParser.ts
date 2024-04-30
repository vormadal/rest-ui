import { OpenAPIV3 } from 'openapi-types'
import { DataType } from '../configurations/DataType'
import type { DuiAppOptions } from '../dui-app/DuiAppOptions'
import type { DuiFieldOptions } from '../dui-app/DuiFieldOptions'
import type { DuiPageOptions } from '../dui-app/DuiPageOptions'
import { DuiPageType } from '../dui-app/DuiPageType'
import type { DuiParameterOptions } from '../dui-app/DuiParamaterOptions'
import type { DuiActionOptionsValues } from '../dui-app/actions/DuiActionOptionValues'
import type { IDuiConfig } from '../dui-app/config/DuiConfig'
import { HttpMethods } from './openApi/HttpMethods'
import type { AnySchema, SchemaComponentMap } from './openApi/OpenApiTypes'
import { sanitizeString } from '../utils/stringUtils'
import { EndpointBuilder } from './EndpointBuilder'
import { PageGroup } from './EndpointGroup'
import { PageBuilder } from './PageBuilder'
import { ParserContext } from './ParserContext'
import type { ParserOptions } from './ParserOptions'
import { PageContext } from './context/PageContext'

const defaultOptions: ParserOptions = {
  request: {},
  response: {},
  fieldsToHide: ['id', 'created', 'modified', 'modifiedOn', 'createdOn']
}
export class OpenApiParser<T extends IDuiConfig> {
  readonly context: PageContext

  constructor(readonly document: OpenAPIV3.Document) {
    this.context = new PageContext(document, defaultOptions)
  }

  parse(): DuiAppOptions<T> {
    const version = this.document.openapi
    if (version.startsWith('3')) {
      return this.parseV3()
    }

    throw new Error('this document type cannot be handled')
  }

  private parseV3(): DuiAppOptions<T> {
    const endpoints = this.getEndpoints()
    this.context.endpoints = endpoints
    const pages = endpoints.map((x) => new PageBuilder(x, this.context))
    const groups = this.getPageGroups(pages)
    this.context.pageGroups = groups

    for (const page of pages) {
      page.pageGroup = groups.find((x) => x.name === page.endpoint.resourceName)
    }

    return {
      baseUrl: this.document.servers ? this.document.servers[0].url : '/',
      dashboard: {
        pages: pages.filter((x) => x.pageType === DuiPageType.list).map((x) => x.route)
      },
      pages: pages.filter((x) => !!x.pageType).map((x) => x.duiPageOptions)
    }
  }

  private getEndpoints() {
    if (!this.document?.paths) return []

    const paths = Object.keys(this.document.paths)
    const endpoints: EndpointBuilder[] = []

    const relevantMethods = [HttpMethods.GET, HttpMethods.POST, HttpMethods.PUT, HttpMethods.DELETE]

    for (const path of paths) {
      const methods = Object.keys(this.document.paths[path] || {}) as HttpMethods[]

      for (const method of methods.filter((x) => relevantMethods.includes(x))) {
        endpoints.push(new EndpointBuilder(path, method, this.context))
      }
    }

    return endpoints
  }

  private getPageGroups(pages: PageBuilder[]) {
    const resourceNames = [...new Set(pages.map((x) => x.endpoint.resourceName))]
    return resourceNames.map((x) => new PageGroup(x, pages))
  }

  //   private getOperation(path: string, method: HttpMethods): OpenAPIV3.OperationObject | null {
  //     const endpoint = this.document.paths[path]
  //     return endpoint ? this.resolveReferenceObject<OpenAPIV3.OperationObject>(endpoint[method]) : null
  //   }

  //   private createCreateFormPage(
  //     path: string,
  //     method: HttpMethods,
  //     source: OpenAPIV3.OperationObject
  //   ): DuiPageOptions<T> {
  //     const pageType = this.resolveType(method, source)
  //     return {
  //       type: DuiPageType.createForm,
  //       route: this.resolveRoute(path, method),
  //       fields: this.resolveFields(pageType, source),
  //       onSubmit: {
  //         type: 'composite',
  //         actions: [
  //           {
  //             type: 'api',
  //             method: 'POST',
  //             routeTemplate: path
  //             //TODO this might have some global variables as paramaters that we need to handle
  //           },
  //           {
  //             type: 'redirect', //TODO redirect to created resource
  //             urlTemplate: this.resolveRoute(path, HttpMethods.GET),
  //             paramaters: this.resolveDataSourceParameters(source)
  //           }
  //         ]
  //       }
  //     }
  //   }

  //   private createUpdateFormPage(
  //     path: string,
  //     method: HttpMethods,
  //     source: OpenAPIV3.OperationObject
  //   ): DuiPageOptions<T> {
  //     const pageType = this.resolveType(method, source)
  //     return {
  //       type: DuiPageType.updateForm,
  //       route: this.resolveRoute(path, method),
  //       fields: this.resolveFields(pageType, source),
  //       dataSource: {
  //         method: 'GET',
  //         dataField: this.options.response.dataField, //TODO
  //         routeTemplate: path, //TODO the put endpoint might be different from the get endpoint that we need here
  //         type: 'api',
  //         paramaters: this.resolveDataSourceParameters(source)
  //       },
  //       onSubmit: {
  //         type: 'composite',
  //         actions: [
  //           {
  //             type: 'api',
  //             method: 'PUT',
  //             routeTemplate: path,
  //             paramaters: this.resolveDataSourceParameters(source) //TODO this might have to be different?
  //           },
  //           {
  //             type: 'redirect',
  //             urlTemplate: this.resolveRoute(path, HttpMethods.GET),
  //             paramaters: this.resolveDataSourceParameters(source)
  //           }
  //         ]
  //       }
  //     }
  //   }

  //   private createRecordPage(path: string, method: HttpMethods, source: OpenAPIV3.OperationObject): DuiPageOptions<T> {
  //     const deleteAction = this.getOperation(path, HttpMethods.DELETE)
  //     const updateAction = this.getOperation(path, HttpMethods.PUT)

  //     const actions: DuiActionOptionsValues[] = []
  //     if (deleteAction) {
  //       actions.push({
  //         type: 'composite',
  //         label: 'Delete',
  //         actions: [
  //           {
  //             method: 'DELETE',
  //             routeTemplate: path,
  //             type: 'api',
  //             dataField: this.options.response.dataField,
  //             paramaters: [
  //               {
  //                 name: 'id',
  //                 valueFieldName: 'id',
  //                 from: 'path'
  //               }
  //             ]
  //           },
  //           {
  //             type: 'redirect',
  //             urlTemplate: this.resolveRoute(path.substring(0, path.lastIndexOf('/')), HttpMethods.GET)
  //           }
  //         ]
  //       })
  //     }

  //     if (updateAction) {
  //       actions.push({
  //         label: 'Edit',
  //         type: 'redirect',
  //         urlTemplate: this.resolveRoute(path, HttpMethods.PUT),
  //         paramaters: [
  //           {
  //             name: 'id',
  //             valueFieldName: 'id',
  //             from: 'path'
  //           }
  //         ]
  //       })
  //     }
  //     return {
  //       type: DuiPageType.record,
  //       route: this.resolveRoute(path, method),
  //       fields: this.resolveFields(DuiPageType.record, source),
  //       dataSource: {
  //         method: 'GET',
  //         dataField: this.options.response.dataField, //TODO
  //         routeTemplate: path,
  //         type: 'api',
  //         paramaters: this.resolveDataSourceParameters(source)
  //       },
  //       actions: actions
  //     }
  //   }

  //   private resolveDataSourceParameters(source: OpenAPIV3.OperationObject): DuiParameterOptions[] {
  //     return (source.parameters ?? [])
  //       .map((x) => this.resolveReferenceObject<OpenAPIV3.ParameterObject>(x))
  //       .filter((x) => x.required)
  //       .map((x) => ({
  //         name: x.name,
  //         valueFieldName: x.name, //TODO make smarter and search the schema fields or origin path
  //         from: x.in === 'path' ? 'path' : 'data' //TODO this might not always be the case
  //       }))
  //   }

  //   private createListPage(path: string, method: HttpMethods, source: OpenAPIV3.OperationObject): DuiPageOptions<T> {
  //     const fields = this.resolveFields(DuiPageType.list, source)
  //     const showOperationPath = `${path}/{id}`

  //     source.parameters

  //     const showRoute = this.resolveRoute(showOperationPath, HttpMethods.GET)
  //     const editRoute = this.resolveRoute(showOperationPath, HttpMethods.PUT)

  //     const showOperation = this.getOperation(showOperationPath, HttpMethods.GET)
  //     const editOperation = this.getOperation(showOperationPath, HttpMethods.PUT)

  //     if (showOperation) {
  //       fields.push({
  //         type: DataType.BUTTON,
  //         linkTo: showRoute,
  //         displayName: 'Show',
  //         name: 'show',
  //         parameters: [
  //           {
  //             name: 'id',
  //             valueFieldName: 'id',
  //             from: 'data'
  //           }
  //         ]
  //       })
  //     }

  //     if (editOperation) {
  //       fields.push({
  //         type: DataType.BUTTON,
  //         linkTo: editRoute,
  //         displayName: 'Edit',
  //         name: 'edit',
  //         parameters: [
  //           {
  //             name: 'id',
  //             valueFieldName: 'id',
  //             from: 'data'
  //           }
  //         ]
  //       })
  //     }

  //     const actions: DuiActionOptionsValues[] = []
  //     const createRoute = this.getOperation(path, HttpMethods.POST)
  //     if (createRoute) {
  //       actions.push({
  //         type: 'redirect',
  //         label: 'Create',
  //         urlTemplate: this.resolveRoute(path, HttpMethods.POST)
  //       })
  //     }

  //     return {
  //       type: DuiPageType.list,
  //       route: this.resolveRoute(path, method),
  //       fields: fields,
  //       actions: actions,
  //       otherDataSources: fields
  //         .filter((x) => x.type === DataType.LOOKUP)
  //         .map((field) => ({
  //           type: 'api',
  //           method: 'GET',
  //           dataField: this.options.response.dataField,
  //           routeTemplate: '', // this.getLookupSchema(field.name, ),
  //           paramaters: [
  //             {
  //               from: 'data',
  //               name: 'id', // TODO this might not always be the case
  //               valueFieldName: field.name //TODO these two might not be the same
  //             }
  //           ]

  //           // lookupFieldName: field.name,
  //           // lookupValue: (fieldName) => id
  //         })),
  //       dataSource: {
  //         method: 'GET',
  //         dataField: this.options.response.dataField, //TODO make this dynamic,
  //         routeTemplate: path,
  //         type: 'api'
  //         // paramaters: this.resolveDataSourceParamaters(path) //TODO handle parameters
  //       }
  //     }
  //   }

  //   private resolveProperty(
  //     name: string,
  //     reference: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | null | undefined,
  //     hideMetadataFields: boolean
  //   ): DuiFieldOptions<T> {
  //     const schema = this.resolveReferenceObject<OpenAPIV3.SchemaObject>(reference)
  //     const type = this.resolvePropertyType(name, schema)

  //     return {
  //       name: name,
  //       displayName: sanitizeString(name),
  //       type: type,
  //       hidden: hideMetadataFields && ['id', 'created', 'modified', 'modifiedOn', 'createdOn'].includes(name)
  //     }
  //   }

  //   private resolvePropertyType(name: string, schema: OpenAPIV3.SchemaObject) {}

  //   private resolveFields(type: DuiPageType, source: OpenAPIV3.OperationObject): DuiFieldOptions<T>[] {
  //     const responseBody = this.resolveReferenceObject<OpenAPIV3.ResponseObject>(source.responses[200])
  //     let schema = this.resolveReferenceObject<OpenAPIV3.SchemaObject>(
  //       responseBody?.content && responseBody?.content['application/json']?.schema
  //     )
  //     if (schema?.type === 'array') {
  //       schema = this.resolveReferenceObject<OpenAPIV3.NonArraySchemaObject>(
  //         (schema as OpenAPIV3.ArraySchemaObject).items as any
  //       )
  //     }

  //     if (type === DuiPageType.createForm) {
  //       const requestBody = this.resolveReferenceObject<OpenAPIV3.RequestBodyObject>(source.requestBody)
  //       schema = this.resolveReferenceObject<OpenAPIV3.SchemaObject>(
  //         requestBody?.content && requestBody?.content['application/json']?.schema
  //       )
  //     }

  //     let hideMetadataFields = false
  //     switch (type) {
  //       case DuiPageType.list:
  //       case DuiPageType.record:
  //         hideMetadataFields = true
  //       case DuiPageType.updateForm:
  //       case DuiPageType.createForm:
  //         return Object.keys(schema?.properties ?? {}).map((name) => {
  //           return this.resolveProperty(name, schema?.properties && schema?.properties[name], hideMetadataFields)
  //         })
  //     }

  //     return []
  //   }
  // }
}
