import { OpenAPIV3 } from 'openapi-types'
import type { PageContext } from '../context/PageContext'
import { SchemaProperty } from './SchemaProperty'

export class Schema<T> {
  constructor(protected readonly source: T | OpenAPIV3.ReferenceObject, protected readonly context: PageContext) {}

  get name() {
    return this.ref?.substring(this.ref.lastIndexOf('/')) || null
  }

  get ref() {
    return (this.source as OpenAPIV3.ReferenceObject).$ref || null
  }

  get schema(): T {
    const value = this.context.resolveReference<T>(this.source)

    if (this.isList) {
      return this.context.resolveReference<T>((value as OpenAPIV3.ArraySchemaObject).items as any)
    }

    return value
  }

  get properties() {
    if ((this.schema as OpenAPIV3.NonArraySchemaObject).properties) {
      const props = (this.schema as OpenAPIV3.NonArraySchemaObject).properties!

      return Object.keys(props).map(
        (name) => new SchemaProperty(name, new Schema<OpenAPIV3.SchemaObject>(props[name], this.context), this.context)
      )
    }

    return []
  }

  get isList() {
    return (this.context.resolveReference<T>(this.source) as OpenAPIV3.SchemaObject).type === 'array'
  }
}
