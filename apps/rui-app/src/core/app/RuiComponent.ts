import { ComponentSpec } from 'rui-core';
import { RuiAppOptions } from './RuiApp';
import { Endpoint } from './Endpoint';

/**
 * Represents a component in the RUI app.
 * This class is used to store the component configuration and the data sources that are used by the component.
 * This class can be extended to add more functionality to the component.
 */
export class RuiComponent<ComponentType> {
  readonly Component: ComponentType;
  readonly dataSources: Endpoint<ComponentType>[];

  readonly children: RuiComponent<ComponentType>[];

  constructor(
    public readonly componentSpec: ComponentSpec,
    options: RuiAppOptions<ComponentType>
  ) {
    this.Component = options.getComponent({
      name: componentSpec.componentName || 'default',
      spec: componentSpec,
    });
    this.dataSources =
      componentSpec.dataSources?.map((x) => new Endpoint(x, options)) ?? [];
    this.children =
      componentSpec.components?.map((x) =>
        options.getComponentConfiguration(x, options)
      ) ?? [];
  }

  getOption<T>(name: string): T {
    return this.componentSpec.options?.[name] as T;
  }

  getDataSource(name: string): Endpoint<ComponentType> | undefined {
    return this.dataSources.find(
      (x) => x.id.toLowerCase() === name.toLowerCase()
    );
  }
}
