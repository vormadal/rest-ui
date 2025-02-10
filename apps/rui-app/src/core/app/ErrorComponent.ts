import { ErrorComponentSpec } from 'rui-core';
import { RuiAppOptions } from './RuiApp';
import { RuiComponent } from './RuiComponent';

export class ErrorComponent<ComponentType> extends RuiComponent<ComponentType> {
  constructor(
    public readonly spec: ErrorComponentSpec,
    options: RuiAppOptions<ComponentType>
  ) {
    super(spec, options);
  }
}
