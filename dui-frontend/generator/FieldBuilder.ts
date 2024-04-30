import type { OpenAPIV3 } from 'openapi-types'
import { DataType } from '../configurations/DataType'
import type { DuiFieldOptions, DuiLookupFieldOptions } from '../dui-app/DuiFieldOptions'
import { DuiPageType } from '../dui-app/DuiPageType'
import type { FieldContext } from './context/FieldContext'
import type { EndpointBuilder } from './EndpointBuilder'
import { HttpMethods } from './openApi/HttpMethods'

export class FieldBuilder {
  constructor(
    public readonly name: string,
    public readonly schema: OpenAPIV3.SchemaObject,
    private readonly context: FieldContext
  ) {}

  get type() {
    if (this.isLookupField()) {
      return DataType.LOOKUP
    }

    switch (this.schema.type) {
      case 'string':
        switch (this.schema.format) {
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
        return null
      // throw new Error(`Property type ${this.schema.type} is not yet implemented`)
    }
  }
  get duiFieldOptions(): DuiFieldOptions<any> {
    const hideMetadataFields = [DuiPageType.list, DuiPageType.record].includes(this.context.page.pageType!)
    const hidden = hideMetadataFields && this.context.options.fieldsToHide.includes(this.name)

    const options = {
      name: this.name,
      displayName: sanitizeString(this.name),
      type: this.type || DataType.STRING,
      hidden: hidden,
      component: [DuiPageType.createForm, DuiPageType.updateForm].includes(this.context.page.pageType!)
        ? 'write'
        : 'read'
    }

    if (this.type === DataType.LOOKUP && this.lookupEndpoint) {
      let lookupOptions = options as unknown as DuiLookupFieldOptions

      //convert from iterator to array using the spread operator
      const properties = [...Object.keys(this.lookupEndpoint.responseSchema.properties || {})]

      const redirectPage = this.context.pageGroups.find(x => x.name === this.lookupEndpoint?.resourceName)?.record

      lookupOptions.dataSource = this.lookupEndpoint.datasourceAction!
      lookupOptions.dataSource.paramaters![lookupOptions.dataSource.paramaters!.length - 1].valueFieldName = this.name
      lookupOptions.dataSource.paramaters![lookupOptions.dataSource.paramaters!.length - 1].from = 'data'
      lookupOptions.keyField = 'id' //TODO should get this from lookup endpoint response schema
      lookupOptions.labelField = properties.find((x) => x.toLowerCase().endsWith('name')) || 'name' //TODO should get this from lookup endpoint response schema

      lookupOptions.redirectAction = redirectPage?.getRedirectAction(undefined, 'data');
    }
    return options
  }

  private isLookupField(): boolean {
    if (this.name.toLowerCase() === 'id' || !this.name.toLowerCase().endsWith('id')) return false // TODO might be something else than id?

    return !!this.lookupEndpoint
  }

  get lookupEndpoint(): EndpointBuilder | undefined {
    //TODO sanitize entity name
    const lookupType = this.name.substring(0, this.name.length - 2)
    console.log('lookup type', lookupType)

    for (const endpoint of this.context.endpoints.filter((x) => x.method === HttpMethods.GET)) {
      if ((endpoint.responseSchemaRef as OpenAPIV3.ReferenceObject)?.$ref?.toLowerCase().endsWith(lookupType)) {
        return endpoint
      }
    }
    return undefined
  }
}
