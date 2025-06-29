import { OpenAPIV3 } from 'openapi-types';
import { OpenAPISpec } from './OpenAPISpec';

export class Schema<T extends OpenAPIV3.SchemaObject> {
  constructor(
    public readonly propertyName: string,
    protected readonly source: T | OpenAPIV3.ReferenceObject,
    protected readonly apiSpec: OpenAPISpec
  ) {}

  /**
   * returns the name of the schema which corresponds to the last segment of the schema reference.
   * If the source was not a reference, the name is null
   */
  get name() {
    return this.ref?.substring(this.ref.lastIndexOf('/')) || null;
  }

  /**
   * returns the reference value if the source was a reference otherwise null
   */
  get ref() {
    return (this.source as OpenAPIV3.ReferenceObject).$ref || null;
  }

  /**
   * The OpenAPI schema given by the source value.
   * If the source was a reference the referenced schema is returned
   */
  get dereferencedSource(): T | undefined {
    const value = this.apiSpec.resolveSchemaReference<T>(this.source);
    return value;
  }

  get properties() {
    // get the props from the dereferenced non-array schema properties or the items properties of the array schema
    const props =
      (this.dereferencedSource as OpenAPIV3.NonArraySchemaObject).properties ||
      this.apiSpec.resolveSchemaReference(
        (this.dereferencedSource as OpenAPIV3.ArraySchemaObject).items
      )?.properties ||
      {};

    return Object.keys(props).map(
      (name) => new Schema(name, props[name], this.apiSpec)
    );
  }

  get format() {
    return this.apiSpec.resolveSchemaReference<T>(this.source)?.format;
  }

  get type() {
    return this.apiSpec.resolveSchemaReference<T>(this.source)?.type;
  }
  get isList() {
    return (
      (
        this.apiSpec.resolveSchemaReference<T>(
          this.source
        ) as OpenAPIV3.SchemaObject
      ).type === 'array'
    );
  }
}
