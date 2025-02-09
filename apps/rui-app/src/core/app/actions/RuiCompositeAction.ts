import { RuiCompositeActionSpec } from 'rui-core';
import { RuiAppOptions } from '../RuiApp';
import { RuiContext } from '../RuiContext';
import { RuiAction } from './RuiAction';

export class RuiCompositeAction<
  ComponentType
> extends RuiAction<ComponentType> {
  actions: RuiAction<ComponentType>[];

  constructor(
    private readonly spec: RuiCompositeActionSpec,
    options: RuiAppOptions<ComponentType>
  ) {
    super();
    this.actions = spec.actions.map((x) => options.getAction(x, options));
  }

  async run(context: RuiContext<ComponentType>): Promise<void> {
    for (const action of this.actions) {
      await action.run(context);
    }
  }
}
