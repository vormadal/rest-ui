import { QueryValueSpec } from '../spec/data/QueryValueSpec';
import { DataValue } from './DataValue';
import { RuiContext } from './RuiContext';

export class QueryValue<ComponentType> extends DataValue<ComponentType> {
  constructor(private readonly spec: QueryValueSpec) {
    super(spec.name);
  }

  get(context: RuiContext<ComponentType>): unknown {
    const url = new URL(context.url || '');
    return url.searchParams.get(this.name);
  }

  set(context: RuiContext<ComponentType>, value: unknown): void {
    const url = new URL(context.url || '');
    url.searchParams.set(this.name, value as string);
    context.url = url.toString();
  }
}
