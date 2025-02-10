import { PathValueSpec } from 'rui-core';
import { DataValue } from './DataValue';
import { RuiContext } from './RuiContext';

export class PathValue<ComponentType> extends DataValue<ComponentType> {
  constructor(private readonly spec: PathValueSpec) {
    super(spec.name);
  }

  private getValueReference(context: RuiContext<ComponentType>): {
    segments: string[];
    valuePosition: number;
  } {
    const route = context.url || '';
    const routeTemplate = context.urlTemplate || '';
    const routeParts = route.split('/').filter((x) => !!x);
    const templateParts = routeTemplate.split('/').filter((x) => !!x);

    const templatePart = templateParts.find((x) => x === `{${this.name}}`);
    const index = templatePart ? templateParts.indexOf(templatePart) : -1;

    return { segments: routeParts, valuePosition: index };
  }
  get(context: RuiContext<ComponentType>): unknown {
    const { segments, valuePosition } = this.getValueReference(context);
    return valuePosition >= 0 ? segments[valuePosition] : '';
  }

  set(context: RuiContext<ComponentType>, value: unknown): void {
    context.url = context.url?.replace(`{${this.name}}`, value as string);
  }
}
