import type { OpenAPIV3 } from 'openapi-types';
import { OpenAPISpec } from './OpenAPISpec';

export class ParameterSchema {
  constructor(
    public readonly source:
      | OpenAPIV3.ParameterObject
      | OpenAPIV3.ReferenceObject,
    apiSpec: OpenAPISpec
  ) {}

  get dereferencedSource() {
    return this.source as OpenAPIV3.ParameterObject; // TODO: what does a reference object look like for a parameter object?
  }

  get required() {
    return this.dereferencedSource.required;
  }

  get in() {
    return this.dereferencedSource.in;
  }

  get name() {
    return this.dereferencedSource.name;
  }
}
