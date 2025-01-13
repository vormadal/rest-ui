import { OpenAPIV3 } from 'openapi-types'
import type { PageContext } from '../context/PageContext'
import { SchemaProperty } from './SchemaProperty'

export class Schema<T> {
  constructor(protected readonly source: T | OpenAPIV3.ReferenceObject, protected readonly context: PageContext) {}

  /**
   * returns the name of the schema which corresponds to the last segment of the schema reference.
   * If the source was not a reference, the name is null
   */
  get name() {
    return this.ref?.substring(this.ref.lastIndexOf('/')) || null
  }

  /**
   * returns the reference value if the source was a reference otherwise null
   */
  get ref() {
    return (this.source as OpenAPIV3.ReferenceObject).$ref || null
  }

  /**
   * The OpenAPI schema given by the source value.
   * If the source was a reference the referenced schema is returned
   */
  get schema(): T {
    const value = this.context.resolveReference<T>(this.source)

    if (this.isList) {
      return this.context.resolveReference<T>((value as OpenAPIV3.ArraySchemaObject).items as any)
    }
    return value
  }

  /**
   *
   */
  get dataSchema() {
    if (this.isList) {
      return this.context.resolveReference<T>((this.schema as OpenAPIV3.ArraySchemaObject).items as any)
    }
    return this.schema
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
