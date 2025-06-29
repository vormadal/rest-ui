import { ComponentSpec } from './ComponentSpec';
import { EndpointSpec } from './EndpointSpec';
import { RouteSpec } from './RouteSpec';

export interface RuiPageSpec extends ComponentSpec {
  type: 'page';
  route: RouteSpec;

  showInMenu?: boolean;

  /**
   * datasources that this component is responsible for.
   */
  dataSources?: EndpointSpec[];
}
