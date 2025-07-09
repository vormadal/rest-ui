import { RouteSpec } from './RouteSpec';

export interface EndpointSpec {
  apiName: string;
  name: string;
  route: RouteSpec;
  method: string; // 'GET' | 'POST' | 'PUT' | 'DELETE';

  parameterMapping: RuiDataMappingSpec[];
  requestBodyMapping: RuiDataMappingSpec[];
  responseBodyMapping: RuiDataMappingSpec[];
}
