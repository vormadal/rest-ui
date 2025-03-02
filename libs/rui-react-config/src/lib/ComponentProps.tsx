import { RuiContext } from 'rui-core/app';

export interface ComponentProps {
  context: RuiContext<React.FC<ComponentProps>>;
  children?: React.ReactNode;
}
