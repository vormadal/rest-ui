import {
  ComponentSpec,
  DataType,
  DataValueSpec,
  RuiActionSpec,
  RuiAppSpec,
} from 'rui-core';
import { DataValue } from './DataValue';
import { Endpoint } from './Endpoint';
import { RuiComponent } from './RuiComponent';
import { RuiContext } from './RuiContext';
import { RuiPage } from './RuiPage';
import { RuiAction } from './actions/RuiAction';

export class RuiApp<ComponentType> {
  readonly pages: RuiPage<ComponentType>[];
  readonly endpoints: Record<string, Endpoint<ComponentType>> = {};
  constructor(
    public readonly spec: RuiAppSpec,
    private readonly options: RuiAppOptions<ComponentType>
  ) {
    this.pages = spec.pages.map((x) => new RuiPage(x, options));
  }

  get baseUrl(): string {
    return this.spec.baseUrl;
  }

  getPage = (
    context: RuiContext<ComponentType>
  ): undefined | RuiPage<ComponentType> => {
    return this.pages.find((x) => x.matches(context));
  };

  fetch(method: string, route: string, data?: unknown) {
    return fetch(`${this.baseUrl}${route.startsWith('/') ? '' : '/'}${route}`, {
      method: method,
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export interface ComponentSelector {
  name: string;
  spec: ComponentSpec;
}

export interface RuiAppOptions<ComponentType> {
  getDataValue(source: DataValueSpec): DataValue<ComponentType>;
  getComponent(selector: ComponentSelector): ComponentType;
  getFormatter(
    type: DataType
  ): undefined | ((value: unknown, options: unknown) => string);
  getComponentConfiguration(
    spec: ComponentSpec,
    options: RuiAppOptions<ComponentType>
  ): RuiComponent<ComponentType>;
  getAction(
    spec: RuiActionSpec,
    options: RuiAppOptions<ComponentType>
  ): RuiAction<ComponentType>;
}
