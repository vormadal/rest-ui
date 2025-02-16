import { RuiDataMappingSpec as RuiDataMappingSpec } from './RuiDataMappingSpec';

export interface EndpointSpec {
  name: string;
  routeTemplate: string;
  method: string; // 'GET' | 'POST' | 'PUT' | 'DELETE';
  parameters?: RuiDataMappingSpec[];
}
