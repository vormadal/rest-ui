import { GeneralOptionSpec } from './GeneralOptionSpec';

export interface ComponentSpec {
  /**
   * unique id of this component
   */
  id: string;

  /**
   * The type of data this component is responsible for.
   * This is used to determine which components should be selectable when mapping data
   */
  dataType?: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'time';

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
