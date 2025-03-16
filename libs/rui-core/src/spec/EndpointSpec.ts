import { RouteSpec } from './RouteSpec';

export interface EndpointSpec {
  name: string;
  route: RouteSpec;
  method: string; // 'GET' | 'POST' | 'PUT' | 'DELETE';
}
