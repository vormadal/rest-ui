/**
 * The spec file can be stored as a json object in local storage, on file system, or in a database.
 */

import { RuiPageSpec } from './RuiPageSpec.js';

export interface RuiAppSpec {
  baseUrl: string;
  pages: RuiPageSpec[];
}
