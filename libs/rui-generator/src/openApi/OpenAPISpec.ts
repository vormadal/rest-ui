import { OpenAPIV3 } from 'openapi-types';
import { OperationSchema } from './OperationSchema';

export class OpenAPISpec {
  readonly schemas: Map<
    string,
    OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
  >;
  readonly requestBodies: Map<
    string,
    OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject
  >;
  readonly responses: Map<
    string,
    OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject
  >;

  constructor(private readonly document: OpenAPIV3.Document<object>) {
    function toDictionary<T>(
      objects: Record<string, T>,
      referencePrefix: string
    ): Map<string, T> {
      const map = new Map<string, T>();
      const keys = Object.keys(objects ?? {});
      if (!objects) return map;
      for (const key of keys) {
        const schema = objects[key];
        if (schema) {
          map.set(`${referencePrefix}${key}`, schema);
        }
      }
      return map;
    }

    this.schemas = toDictionary(
      document?.components?.schemas || {},
      '#/components/schemas/'
    );
    this.requestBodies = toDictionary(
      document?.components?.requestBodies || {},
      '#/components/requestBodies/'
    );
    this.responses = toDictionary(
      document?.components?.responses || {},
      '#/components/responses/'
    );
  }

  get name() {
    return this.document.info.title || 'OpenAPI Spec';
  }

  get baseUrl() {
    return this.document.servers?.[0]?.url || '';
  }

  resolveSchemaReference<T extends OpenAPIV3.SchemaObject>(
    ref: OpenAPIV3.ReferenceObject | T | undefined
  ): T | undefined {
    if ((ref as OpenAPIV3.ReferenceObject)?.$ref) {
      const refKey = (ref as OpenAPIV3.ReferenceObject).$ref;
      return this.schemas.get(refKey) as T;
    }
    return ref as T;
  }

  resolveRequestBodyReference(
    ref: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined
  ) {
    if ((ref as OpenAPIV3.ReferenceObject)?.$ref) {
      const refKey = (ref as OpenAPIV3.ReferenceObject).$ref;
      return this.requestBodies.get(refKey) as OpenAPIV3.RequestBodyObject;
    }
    return ref as OpenAPIV3.RequestBodyObject;
  }

  resolveResponseReference(
    ref: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject | undefined
  ) {
    if ((ref as OpenAPIV3.ReferenceObject)?.$ref) {
      const refKey = (ref as OpenAPIV3.ReferenceObject).$ref;
      return this.responses.get(refKey) as OpenAPIV3.ResponseObject;
    }
    return ref as OpenAPIV3.ResponseObject;
  }

  get operations() {
    return Object.entries(this.document.paths).flatMap(([path, methods]) =>
      Object.entries(
        methods as Record<string, OpenAPIV3.OperationObject<object>>
      ).map(([method, schema]) => {
        return new OperationSchema(method, path, schema, this);
      })
    );
  }
}
