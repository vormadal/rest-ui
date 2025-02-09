import { ComponentSpec } from './ComponentSpec';

export interface RuiPageSpec extends ComponentSpec {
  type: 'page';
  route: string;
  showInMenu?: boolean;
  displayName?: string;
}
