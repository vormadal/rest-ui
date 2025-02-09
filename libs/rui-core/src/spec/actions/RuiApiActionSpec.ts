import { ComponentSpec } from '../ComponentSpec';

export interface RuiApiActionSpec extends ComponentSpec {
  type: 'api';
  dataSource: string;
}
