import { RuiDataMappingSpec } from './RuiDataMappingSpec';

export interface RouteSpec {
  /**
   * The route template e.g. /users/{userId}
   */
  template: string;

  parameters: RuiDataMappingSpec[];
}
