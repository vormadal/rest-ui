import { DataType } from '../configurations/DataType'
import type {
  DuiArrayFieldOptions,
  DuiFieldOptions,
  DuiLookupFieldOptions,
  DuiObjectFieldOptions
} from '../dui-app/DuiFieldOptions'
import { DuiPageType } from '../dui-app/DuiPageType'
import { FieldContext } from './context/FieldContext'
import type { EndpointBuilder } from './EndpointBuilder'
import { HttpMethods } from './openApi/HttpMethods'
import type { SchemaProperty } from './openApi/SchemaProperty'

export class FieldBuilder {
  constructor(public readonly property: SchemaProperty, private readonly context: FieldContext) {}

  get type() {
    if (this.isLookupField()) {
      return DataType.LOOKUP
    }

    switch (this.property.type) {
      case 'string':
        switch (this.property.format) {
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
      case 'object':
        if (this.property.schema.isList) {
          return DataType.ARRAY
        }
        return DataType.OBJECT
      default:
        console.log('unknown field type', this.property.type, this.context.page.route)
        return null
      // throw new Error(`Property type ${this.schema.type} is not yet implemented`)
    }
  }
  get duiFieldOptions(): DuiFieldOptions<any> {
    const hideMetadataFields = [DuiPageType.list, DuiPageType.record].includes(this.context.page.pageType!)
    //TODO make more advanced to identify fields to hide
    let hidden = hideMetadataFields && this.context.options.fieldsToHide.includes(this.property.name)

    if (hideMetadataFields && !hidden) {
      // if we identify it as an id field without knowing where to look that id up, we hide.
      // this is to avoid showing any guids or similar.
      // an exception which is not handled could a human readable id field which is required to be shown
      hidden = this.type !== DataType.LOOKUP && this.property.name.toLowerCase().endsWith('id')
    }

    const options = {
      name: this.property.name,
      displayName: sanitizeString(this.property.name),
      type: this.type || DataType.STRING,
      hidden: hidden,
      component: [DuiPageType.createForm, DuiPageType.updateForm].includes(this.context.page.pageType!)
        ? 'write'
        : 'read'
    }

    if (this.type === DataType.LOOKUP && this.lookupEndpoint) {
      let lookupOptions = options as unknown as DuiLookupFieldOptions

      //convert from iterator to array using the spread operator
      const properties = this.lookupEndpoint.schema.response?.properties || []

      const redirectPage = this.context.pageGroups.find((x) => x.name === this.lookupEndpoint?.resourceName)?.record

      lookupOptions.dataSource = this.lookupEndpoint.datasourceAction!
      lookupOptions.dataSource.paramaters![lookupOptions.dataSource.paramaters!.length - 1].valueFieldName =
        this.property.name
      lookupOptions.dataSource.paramaters![lookupOptions.dataSource.paramaters!.length - 1].from = 'data'
      lookupOptions.keyField = 'id' //TODO should get this from lookup endpoint response schema
      lookupOptions.labelField = properties.find((x) => x.couldBe('name'))?.name || 'name' //TODO should get this from lookup endpoint response schema

      lookupOptions.redirectAction = redirectPage?.getRedirectAction(undefined, 'data')
    }

    if (this.type && [DataType.ARRAY, DataType.OBJECT].includes(this.type)) {
      let objectOptions = options as unknown as DuiObjectFieldOptions

      objectOptions.fields = this.property.schema.properties
        .map((x) => new FieldBuilder(x, new FieldContext(this.context.page, `${this.context.fieldKey}.${x.name}`)))
        .filter((x) => x.context.fieldKey.split('.').length < 3)
        .map((x) => x.duiFieldOptions)
      // debugger
    }

    if (this.type === DataType.ARRAY) {
      let arrayOptions = options as unknown as DuiArrayFieldOptions
    }
    return options
  }

  private isLookupField(): boolean {
    if (this.property.name.toLowerCase() === 'id' || !this.property.couldBe('id')) return false // TODO might be something else than id?

    return !!this.lookupEndpoint
  }

  get lookupEndpoint(): EndpointBuilder | undefined {
    //TODO sanitize entity name

    let lookupType = this.property.name
    if (lookupType.toLowerCase().endsWith('guid')) {
      lookupType = lookupType.substring(0, this.property.name.length - 4)
    }
    if (lookupType.toLowerCase().endsWith('id')) {
      lookupType = lookupType.substring(0, this.property.name.length - 2)
    }

    for (const endpoint of this.context.endpoints.filter((x) => x.method === HttpMethods.GET)) {
      if (endpoint.schema.response?.ref?.toLowerCase().endsWith(lookupType)) {
        return endpoint
      }
    }
    return undefined
  }
}
