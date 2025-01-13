import type { OpenAPIV3 } from 'openapi-types'
import { Schema } from './Schema'
import type { PageContext } from '../context/PageContext'

export class ParameterSchema extends Schema<OpenAPIV3.ParameterObject> {
  constructor(public readonly source: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject, context: PageContext) {
    super(source, context)
  }

  get required() {
    return this.schema.required
  }

  get in() {
    return this.schema.in
  }

  get name() {
    return this.schema.name
  }

  couldBe(name: string) {
    const sanitized = this.name.toLowerCase()
    return sanitized.endsWith(name) || sanitized.startsWith(name)
  }
}
