import { RuiContext } from 'rui-core/app';
import { ReactRuiComponent } from './ReactRuiComponent';

export interface ComponentProps {
  context: RuiContext<ReactRuiComponent>;
  children?: React.ReactNode;
}
