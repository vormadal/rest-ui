import { ComponentSpec } from './ComponentSpec';
import { EndpointSpec } from './EndpointSpec';
import { GeneralOptionSpec } from './GeneralOptionSpec';
import { RouteSpec } from './RouteSpec';

export interface RuiPageSpec {
  id: string;

  name: string;

  route: RouteSpec;

  showInMenu?: boolean;

  /**
   * datasources that this component is responsible for.
   */
  dataSources?: EndpointSpec[];

  /**
   * child components
   */
  components: ComponentSpec[];

  options: GeneralOptionSpec;
}
