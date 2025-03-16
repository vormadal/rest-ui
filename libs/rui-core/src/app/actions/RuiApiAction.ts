import { RuiApiActionSpec } from '../../spec/actions/RuiApiActionSpec';
import { RuiAppOptions } from '../RuiApp';
import { RuiContext } from '../RuiContext';
import { RuiAction } from './RuiAction';

export class RuiApiAction<ComponentType> implements RuiAction<ComponentType> {
  constructor(
    private readonly spec: RuiApiActionSpec,
    options: RuiAppOptions<ComponentType>
  ) {}

  async run(context: RuiContext<ComponentType>): Promise<void> {
    const dataSource = context.app.getDataSource(this.spec.dataSource, context);
    if (!dataSource) {
      throw new Error(`Data source ${this.spec.dataSource} not found`);
    }
    await dataSource.fetch(context);
  }
}
