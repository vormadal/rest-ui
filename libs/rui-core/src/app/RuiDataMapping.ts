import { RuiContext } from './RuiContext';
import { DataValue } from './DataValue';
import { RuiAppOptions } from './RuiApp';
import { RuiDataMappingSpec } from '../spec/RuiDataMappingSpec';

/**
 * Represents a mapping from a field, query or path parameter given by the source field,
 * to another field, query or path parameter given by the target field.
 */
export class RuiDataMapping<ComponentType> {
  public readonly source: DataValue<ComponentType>;

  public readonly target: DataValue<ComponentType>;

  constructor(
    private readonly spec: RuiDataMappingSpec,
    private readonly options: RuiAppOptions<ComponentType>
  ) {
    this.source = options.getDataValue(spec.source);
    this.target = options.getDataValue(spec.target);
  }

  inject(context: RuiContext<ComponentType>): RuiContext<ComponentType> {
    const value = this.source.get(context);
    this.target.set(context, value);
    return context;
  }
}
