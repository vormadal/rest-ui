import { RuiActionSpec } from './actions/RuiActionSpec';
import { ComponentSpec } from './ComponentSpec';

/**
 * A component that represents an action e.g. a button or a link
 */
export interface ActionComponentSpec extends ComponentSpec {
  type: 'action';
  action: RuiActionSpec;
  label: string;
}
