import { RuiRedirectActionSpec } from 'rui-core';
import { RuiAppOptions } from '../RuiApp';
import { RuiDataMapping } from '../RuiDataMapping';
import { RuiAction } from './RuiAction';
import { RuiContext } from '../RuiContext';

export class RuiRedirectAction<ComponentType>
  implements RuiAction<ComponentType>
{
  readonly parameters: RuiDataMapping<ComponentType>[];
  constructor(
    private readonly spec: RuiRedirectActionSpec,
    options: RuiAppOptions<ComponentType>
  ) {
    this.parameters =
      spec.paramaters?.map((x) => new RuiDataMapping(x, options)) ?? [];
  }

  get label() {
    return this.spec.label;
  }

  get urlTemplate(): string {
    return this.spec.urlTemplate;
  }

  async run(context: RuiContext<ComponentType>): Promise<void> {
    if (!context.navigateTo) {
      console.error('No navigateTo function found in context');
      return;
    }

    context.url = this.urlTemplate;
    context.urlTemplate = this.urlTemplate;
    for (const param of this.parameters) {
      param.inject(context);
    }

    context.navigateTo(context.url);
  }
}
