import { RuiAppOptions } from './RuiApp';
import { Endpoint } from './Endpoint';
import { ComponentSpec } from '../spec/ComponentSpec';
import { ComponentOption } from '../ComponentConfiguration';
import { extractField } from '../lib/utils';

/**
 * Represents a component in the RUI app.
 * This class is used to store the component configuration and the data sources that are used by the component.
 * This class can be extended to add more functionality to the component.
 */
export class RuiComponent<ComponentType> {
  readonly Component: ComponentType;
  readonly componentOptions: ComponentOption[] = [];
  readonly children: RuiComponent<ComponentType>[];

  constructor(
    public readonly componentSpec: ComponentSpec,
    options: RuiAppOptions<ComponentType>
  ) {
    const componentConfiguration = options.getComponent({
      name: componentSpec.name || 'default',
      spec: componentSpec,
    });
    this.Component = componentConfiguration.component;
    this.componentOptions = componentConfiguration.options;
    this.children =
      componentSpec.components?.map((x) =>
        options.getComponentConfiguration(x, options)
      ) ?? [];
  }

  get id() {
    return this.componentSpec.id;
  }

  getFieldValue<T>(
    dataAccess: Record<string, unknown>,
    sourceOptionName: string,
    field?: string
  ): T | undefined {
    const dataSource = this.getOption<string>(sourceOptionName);
    if (!dataSource) {
      console.warn(`Data source ${sourceOptionName} not found in component.`);
      return undefined;
    }

    const data = (dataAccess[dataSource ?? ''] as T) ?? undefined;
    return extractField<T>(data, field).get();
  }

  getOption<T>(name: string): T | undefined {
    if (!this.componentOptions.find((x) => x.name === name)) {
      console.warn(
        `Option ${name} not found in component ${this.componentSpec.name}`
      );
    }
    return this.componentSpec.options?.[name] as T;
  }
}
