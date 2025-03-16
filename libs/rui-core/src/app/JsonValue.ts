import { extractField } from '../lib/utils';
import { JsonValueSpec } from '../spec/data/JsonValueSpec';
import { DataValue } from './DataValue';
import { RuiContext } from './RuiContext';

export class JsonValue<ComponentType> extends DataValue<ComponentType> {
  constructor(private readonly spec: JsonValueSpec) {
    super(spec.name);
  }

  get(context: RuiContext<ComponentType>): unknown {
    const dataSource = context.app.getDataSource(this.spec.dataSource, context);
    if (!dataSource) {
      throw new Error(`Data source ${this.spec.dataSource} not found`);
    }
    return extractField(
      this.spec.source == 'input' ? dataSource.input : dataSource.output,
      this.name
    ).get();
  }

  set(context: RuiContext<ComponentType>, value: unknown): void {
    const dataSource = context.app.getDataSource(this.spec.dataSource, context);
    if (!dataSource) {
      throw new Error(`Data source ${this.spec.dataSource} not found`);
    }
    return extractField(
      this.spec.source == 'input' ? dataSource.input : dataSource.output,
      this.name
    ).set(value);
  }
}
