import { OpenAPIV3 } from 'openapi-types'
import type { ApiBuilderContext } from '../context/ApiBuilderContext'
import { Schema } from './Schema'
import { ParameterSchema } from './ParameterSchema'

export class OperationSchema {
  constructor(private readonly schema: OpenAPIV3.OperationObject<object>, private readonly context: ApiBuilderContext) {}

  get parameters() {
    return this.schema.parameters?.map((x) => new ParameterSchema(x, this.context)) || []
  }

  get requestBody() {
    try {
      const requestBody = this.context.resolveReference<OpenAPIV3.RequestBodyObject>(this.schema.requestBody)
      if (requestBody?.content && requestBody?.content['application/json']?.schema) {
        return new Schema(requestBody.content['application/json'].schema, this.context)
      }
    } catch {
      console.log(`Could not resolve request body schema for`, this.schema)
    }
    return null
  }

  get response() {
    const responseBody = this.context.resolveReference<OpenAPIV3.ResponseObject>(this.schema.responses[200])
    if (responseBody?.content && responseBody?.content['application/json']?.schema) {
      return new Schema(responseBody.content['application/json'].schema, this.context)
    }
    return null
  }
}
