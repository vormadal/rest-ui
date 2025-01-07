import type { OpenAPIV3 } from 'openapi-types'
import type { Schema } from './Schema'
import type { PageContext } from '../context/PageContext'

export class SchemaProperty {
  constructor(
    public readonly name: string,
    public readonly schema: Schema<OpenAPIV3.SchemaObject>,
    private readonly context: PageContext
  ) {}

  get type() {
    return this.schema.schema.type
  }

  get format() {
    return this.schema.schema.format
  }

  couldBe(propertyName: string): boolean {
    const sanitizedName = this.name.toLowerCase()
    return sanitizedName.endsWith(propertyName) || sanitizedName.startsWith(propertyName)
  }
}
