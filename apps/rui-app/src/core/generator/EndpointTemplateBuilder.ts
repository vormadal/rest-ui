import type { OpenAPIV3 } from 'openapi-types';
import { EndpointParameter, EndpointTemplate, SchemaObject } from 'rui-core';
import type { ApiBuilderContext } from './context/ApiBuilderContext';
import { HttpMethods } from './openApi/HttpMethods';
import { OperationSchema } from './openApi/OperationSchema';

export class EndpointTemplateBuilder {
  constructor(
    public readonly path: string,
    public readonly method: HttpMethods,
    private readonly context: ApiBuilderContext
  ) {}

  matches(path: string, method: HttpMethods) {
    return this.path === path && this.method === method;
  }

  get resourceName(): string {
    const segments = this.path.split('/').filter((x) => !x.startsWith('{'));
    return segments[segments.length - 1];
  }

  private get operationSchema() {
    const endpoint = this.context.document.paths[
      this.path
    ] as OpenAPIV3.PathItemObject;
    if (!endpoint || !endpoint[this.method]) {
      throw new Error(`could not find schema for ${this.method} ${this.path}`);
    }
    return new OperationSchema(
      endpoint[this.method] as OpenAPIV3.OperationObject,
      this.context
    );
  }

  get requestSchema(): SchemaObject | undefined {
    // const schema = this.operationSchema.requestBody;
    // if (!schema) {
    //   return undefined;
    // }

    return {};
  }

  get responseSchema(): SchemaObject | undefined {
    const endpoint = this.context.document.paths[
      this.path
    ] as OpenAPIV3.PathItemObject;
    if (!endpoint || !endpoint[this.method]) {
      throw new Error(`could not find schema for ${this.method} ${this.path}`);
    }

    const operation = endpoint[this.method] as OpenAPIV3.OperationObject;
    const response200 = operation.responses['200'] as OpenAPIV3.ResponseObject;

    if (!response200.content) {
      return {};
    }

    const jsonContent = response200.content['application/json'];
    if (!jsonContent) {
      return {};
    }

    if ((jsonContent.schema as OpenAPIV3.ReferenceObject).$ref) {
      return this.context.resolveReference<SchemaObject>(
        jsonContent.schema as OpenAPIV3.ReferenceObject
      );
    }
    return jsonContent.schema as SchemaObject;
    // .content['application/json'].schema
  }

  get parameters(): EndpointParameter[] {
    return this.operationSchema.parameters.map((x) => ({
      in: x.in === 'path' ? 'path' : 'query',
      name: x.name,
    }));
  }

  build(): EndpointTemplate {
    return {
      method: this.method,
      requestSchema: { ...this.requestSchema },
      responseSchema: { ...this.responseSchema },
      path: this.path,
      parameters: [...this.parameters],
      name: this.resourceName,
    };
  }
}
