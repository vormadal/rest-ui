import { RuiContext } from '../RuiContext';

export abstract class RuiAction<ComponentType> {
  abstract run(context: RuiContext<ComponentType>): Promise<void>;
}
