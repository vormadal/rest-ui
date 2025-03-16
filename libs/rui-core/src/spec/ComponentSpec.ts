import { GeneralOptionSpec } from './GeneralOptionSpec';

export interface ComponentSpec {
  /**
   * unique id of this component
   */
  id: string;

  type: string;
  /**
   * The key of the component used to render this component in the UI
   */
  name: string;

  /**
   * child components
   */
  components?: ComponentSpec[];

  options: GeneralOptionSpec;
}
