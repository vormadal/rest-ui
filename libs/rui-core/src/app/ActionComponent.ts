import { ActionComponentSpec } from '../spec/ActionComponentSpec';
import { RuiActionSpec } from '../spec/actions/RuiActionSpec';
import { RuiAppOptions } from './RuiApp';
import { RuiComponent } from './RuiComponent';
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
    const actionSpec = this.getOption<RuiActionSpec>('action');
    if (!actionSpec) {
      throw new Error('ActionComponent must have an action');
    }
    this.action = options.getAction(actionSpec, options);
  }

  async exec(context: RuiContext<ComponentType>): Promise<void> {
    await this.action.run(context);
  }
}
