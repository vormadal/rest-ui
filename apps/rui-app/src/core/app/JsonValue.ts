import { extractField } from '../../lib/utils';
import { DataValue } from './DataValue';
import { RuiContext } from './RuiContext';
import { JsonValueSpec } from 'rui-core';

export class JsonValue<ComponentType> extends DataValue<ComponentType> {
  constructor(private readonly spec: JsonValueSpec) {
    super(spec.name);
  }

  get(context: RuiContext<ComponentType>): unknown {
    const dataSource = context.dataSources[this.spec.dataSource];
    return extractField(
      this.spec.source == 'input' ? dataSource.input : dataSource.output,
      this.name
    ).get();
  }

  set(context: RuiContext<ComponentType>, value: unknown): void {
    const dataSource = context.dataSources[this.spec.dataSource];
    return extractField(
      this.spec.source == 'input' ? dataSource.input : dataSource.output,
      this.name
    ).set(value);
  }
}
