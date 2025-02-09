import { ComponentSpec } from '../ComponentSpec';
import { RuiActionSpec } from './RuiActionSpec';

export interface RuiCompositeActionSpec extends ComponentSpec {
  type: 'composite';
  actions: RuiActionSpec[];
  label?: string;
}
