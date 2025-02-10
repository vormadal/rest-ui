import { RuiAppOptions } from './RuiApp';
import { RuiComponent } from './RuiComponent';
import { ActionComponentSpec } from 'rui-core';
import { RuiContext } from './RuiContext';
import { RuiAction } from './actions/RuiAction';

export class ActionComponent<
  ComponentType
> extends RuiComponent<ComponentType> {
  private readonly action: RuiAction<ComponentType>;
  constructor(
    public readonly spec: ActionComponentSpec,
    options: RuiAppOptions<ComponentType>
  ) {
    super(spec, options);
    this.action = options.getAction(spec.action, options);
  }

  async exec(context: RuiContext<ComponentType>): Promise<void> {
    await this.action.run(context);
  }
}
