import { OpenAPIV3 } from 'openapi-types';
import { OpenAPISpec } from './OpenAPISpec';
import { ParameterSchema } from './ParameterSchema';
import { Schema } from './Schema';

export class OperationSchema {
  constructor(
    public readonly method: string,
    public readonly path: string,
    private readonly schema: OpenAPIV3.OperationObject<object>,
    private readonly apiSpec: OpenAPISpec
  ) {}

  get parameters() {
    return (
      this.schema.parameters?.map(
        (x) => new ParameterSchema(x, this.apiSpec)
      ) || []
    );
  }

  get requestSchema() {
    try {
      const requestBody = this.apiSpec.resolveRequestBodyReference(
        this.schema.requestBody
      );
      if (
        requestBody?.content &&
        requestBody?.content['application/json']?.schema
      ) {
        return new Schema(
          '',
          requestBody.content['application/json'].schema,
          this.apiSpec
        );
      }
    } catch {
      console.log(`Could not resolve request body schema for`, this.schema);
    }
    return null;
  }

  get responseSchema() {
    const responseBody = this.apiSpec.resolveResponseReference(
      this.schema.responses[200]
    );
    if (
      responseBody?.content &&
      responseBody?.content['application/json']?.schema
    ) {
      return new Schema(
        '',
        responseBody.content['application/json'].schema,
        this.apiSpec
      );
    }
    return null;
  }
}
