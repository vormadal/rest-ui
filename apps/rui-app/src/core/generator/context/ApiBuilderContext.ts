import type { OpenAPIV3 } from 'openapi-types';
import type { SchemaMap } from '../openApi/SchemaMap';
import type { SchemaTypes } from '../openApi/SchemaTypes';

export class ApiBuilderContext {
  constructor(public readonly document: OpenAPIV3.Document) {
    const map: SchemaMap = new Map();
    function resolveReferences(
      schemas: { [key: string]: SchemaTypes } | undefined,
      prefix: string
    ) {
      const keys = Object.keys(schemas ?? {});
      if (!schemas) return;
      for (const key of keys) {
        const schema = schemas[key];
        if (schema) {
          map.set(`${prefix}${key}`, schema);
        }
      }
    }

    resolveReferences(document?.components?.schemas, '#/components/schemas/');
    resolveReferences(
      document?.components?.requestBodies,
      '#/components/requestBodies/'
    );
    resolveReferences(
      document?.components?.responses,
      '#/components/responses'
    );

    this._schemas = map;
  }

  private _schemas: SchemaMap;

  get schemas(): SchemaMap {
    return this._schemas;
  }

  resolveReference<T>(obj?: T | OpenAPIV3.ReferenceObject | null): T {
    if (!obj) throw new Error('reference is null');
    if ((obj as OpenAPIV3.ReferenceObject).$ref) {
      const ref = (obj as OpenAPIV3.ReferenceObject).$ref;
      const component = this.schemas.get(ref);
      if ((component as OpenAPIV3.ReferenceObject).$ref) {
        return this.resolveReference<T>(component as OpenAPIV3.ReferenceObject);
      }
      return component as T;
    }
    return obj as T;
  }
}
