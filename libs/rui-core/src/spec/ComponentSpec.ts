import { ActionComponentSpec } from './ActionComponentSpec';
import { EndpointSpec } from './EndpointSpec';
import { RuiFieldSpec } from './RuiFieldSpec';
import { RuiPageSpec } from './RuiPageSpec';

export interface ComponentSpec {
  type: string;
  /**
   * The key of the component used to render this component in the UI
   */
  componentName: string;
  /**
   * datasources that this component is responsible for.
   */
  dataSources?: EndpointSpec[];

  /**
   * Is used to scope data for nested components
   */
  dataScope?: string;

  /**
   * child components
   */
  components?: ComponentSpecValues[];

  options: { [key: string]: unknown };
}

export type ComponentSpecValues =
  | ComponentSpec
  | ActionComponentSpec
  // | RuiRedirectActionSpec
  // | RuiCompositeActionSpec
  // | RuiApiActionSpec
  | RuiPageSpec
  | RuiFieldSpec;
