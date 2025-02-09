import { ComponentSpec } from '../ComponentSpec.js';
import { RuiDataMappingSpec } from '../RuiDataMappingSpec.js';

export interface RuiRedirectActionSpec extends ComponentSpec {
  type: 'redirect';
  urlTemplate: string;
  paramaters?: RuiDataMappingSpec[];
  label?: string;
}
