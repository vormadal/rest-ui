import { OpenAPIV3 } from 'openapi-types';

/**
 * The spec file can be stored as a json object in local storage, on file system, or in a database.
 */

import { RuiPageSpec } from './RuiPageSpec.js';

export interface RuiAppSpec {
  id: string;
  name: string;
  baseUrl: string;
  pages: RuiPageSpec[];
  apis: RuiApiDocument[];
}

export interface RuiApiDocument {
  name: string;
  document: OpenAPIV3.Document<object>;
}
