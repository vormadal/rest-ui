import { DataValueSpec } from './data/DataValueSpec';

/**
 * A mapping between two data values.
 * This could be from a field in an endpoint input or output object 
 * to a query parameter or a path parameter
 * 
 * and vice versa.
 */
export interface RuiDataMappingSpec {
  source: DataValueSpec;

  target: DataValueSpec;
}
