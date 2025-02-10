/**
 * EndpointTemplate
 *
 * Describes the template for an endpoint.
 * This is a 1:1 representation of an endpoint in the OpenAPI spec.
 * If the OpenAPI spec changes, this interface should be updated to reflect those changes.
 * Furthermore this definition can be used to verify that an endpoint is valid.
 */
export interface EndpointTemplate {
  /**
   * The name of the endpoint.
   */
  name: string;

  /**
   * The route template for the endpoint.
   */
  path: string;

  /**
   * The method of the endpoint.
   */
  method: string; // 'GET' | 'POST' | 'PUT' | 'DELETE';

  /**
   * The parameters of the endpoint.
   */
  parameters?: EndpointParameter[];

  requestSchema?: SchemaObject;

  responseSchema?: SchemaObject;
}

export type NonArraySchemaObjectType =
  | 'boolean'
  | 'object'
  | 'number'
  | 'string'
  | 'integer';
export type ArraySchemaObjectType = 'array';
export type SchemaObject = ArraySchemaObject | NonArraySchemaObject;
export interface ArraySchemaObject extends BaseSchemaObject {
  type: ArraySchemaObjectType;
  items: SchemaObject;
}
export interface NonArraySchemaObject extends BaseSchemaObject {
  type?: NonArraySchemaObjectType;
}

export interface BaseSchemaObject {
  title?: string;
  description?: string;
  format?: string;
  // default?: any;
  // multipleOf?: number;
  // maximum?: number;
  // exclusiveMaximum?: boolean;
  // minimum?: number;
  // exclusiveMinimum?: boolean;
  // maxLength?: number;
  // minLength?: number;
  // pattern?: string;
  // additionalProperties?: boolean | ReferenceObject | SchemaObject;
  // maxItems?: number;
  // minItems?: number;
  // uniqueItems?: boolean;
  // maxProperties?: number;
  // minProperties?: number;
  required?: string[];
  // enum?: any[];
  properties?: {
    [name: string]: SchemaObject;
  };
  // allOf?: (ReferenceObject | SchemaObject)[];
  // oneOf?: (ReferenceObject | SchemaObject)[];
  // anyOf?: (ReferenceObject | SchemaObject)[];
  // not?: ReferenceObject | SchemaObject;
  // nullable?: boolean;
  // discriminator?: DiscriminatorObject;
  // readOnly?: boolean;
  // writeOnly?: boolean;
  // xml?: XMLObject;
  // externalDocs?: ExternalDocumentationObject;
  // example?: any;
  // deprecated?: boolean;
}

export interface EndpointParameter {
  in: 'path' | 'query'; //| 'header' | 'cookie';
  name: string;
}
