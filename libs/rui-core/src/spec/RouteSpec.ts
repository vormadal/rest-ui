import { RuiDataMappingSpec } from './RuiDataMappingSpec';

export interface RouteSpec {
  /**
   * The route template
   */
  route: string;

  parameters: RuiDataMappingSpec[];
  /**
   * The display name of the route
   */
  displayName?: string;
}
