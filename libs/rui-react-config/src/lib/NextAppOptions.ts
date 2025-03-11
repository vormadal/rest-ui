import {
  ActionComponentSpec,
  ComponentConfiguration,
  ComponentSpec,
  DataValueSpec,
  defaultDateFormatter,
  defaultDateTimeFormatter,
  defaultNumberFormatter,
  RuiActionSpec,
  RuiApiActionSpec,
  RuiCompositeActionSpec,
  RuiFieldSpec,
  RuiPageSpec,
  RuiRedirectActionSpec,
} from 'rui-core';
import {
  ActionComponent,
  ComponentSelector,
  DataValue,
  JsonValue,
  PathValue,
  QueryValue,
  RuiAction,
  RuiApiAction,
  RuiAppOptions,
  RuiComponent,
  RuiCompositeAction,
  RuiField,
  RuiPage,
  RuiRedirectAction,
} from 'rui-core/app';
import componentLibrary from './ComponentLibrary';
import { ReactRuiComponent } from './ReactRuiComponent';

type T = ReactRuiComponent;
const componentConfigurationValues: Record<
  string,
  (spec: ComponentSpec, options: RuiAppOptions<T>) => RuiComponent<T>
> = {
  action: (spec, options) =>
    new ActionComponent<T>(spec as ActionComponentSpec, options),
  field: (spec, options) => new RuiField(spec as RuiFieldSpec, options),
  page: (spec, options) => new RuiPage<T>(spec as RuiPageSpec, options),
};

const defaultFormatters: Record<
  string,
  (value: unknown, options: unknown) => string
> = {
  'string:date:default': defaultDateFormatter,
  'string:date-time:default': defaultDateTimeFormatter,
  'number:double:default': defaultNumberFormatter,
  'boolean:boolean:default': (value: unknown) => (value ? 'Yes' : 'No'),
};

class NextAppOptions implements RuiAppOptions<T> {
  componentConfigurationValues = componentConfigurationValues;

  sendRequest(
    route: string,
    options: { method: string; body?: unknown; headers: unknown }
  ): {
    ok: boolean;
    status: number;
    statusText: string;
    json: () => Promise<unknown>;
  } {
    return fetch(route, options as unknown as any) as any; //TODO figure out a better way
  }
  reset() {
    this.componentConfigurationValues = componentConfigurationValues;
  }

  getComponentConfiguration(spec: ComponentSpec, options: RuiAppOptions<T>) {
    const configuration = componentConfigurationValues[spec.type];

    return !configuration
      ? new RuiComponent(spec, options)
      : configuration(spec, options);
  }
  getAction(spec: RuiActionSpec, options: RuiAppOptions<T>): RuiAction<T> {
    switch (spec.type) {
      case 'composite':
        return new RuiCompositeAction(spec as RuiCompositeActionSpec, options);
      case 'redirect':
        return new RuiRedirectAction(spec as RuiRedirectActionSpec, options);
      case 'api':
        return new RuiApiAction(spec as RuiApiActionSpec, options);
    }
  }
  getComponent({
    spec,
    name,
  }: ComponentSelector): ComponentConfiguration<ReactRuiComponent> {
    return componentLibrary.getComponent(name);
  }

  getFormatter(
    name?: string
  ): undefined | ((value: unknown, options: unknown) => string) {
    if (!name) return undefined;
    return defaultFormatters[name];
    // switch (type) {
    //   case DataType.DATE:
    //     return defaultDateFormatter as (value: V, options: O) => string;
    //   case DataType.DATE_TIME:
    //     return defaultDateTimeFormatter as (value: V, options: O) => string;
    //   case DataType.NUMBER:
    //     return defaultNumberFormatter as (value: V, options: O) => string;
    //   case DataType.TIME:
    //     return defaultTimeFormatter as (value: V, options: O) => string;
    //   case DataType.STRING:
    //   case DataType.BUTTON:
    //   case DataType.BOOLEAN:
    //   case DataType.LOOKUP:
    //   case DataType.OBJECT:
    //     return undefined;
    //   case DataType.ARRAY:
    //     return defaultArrayFormatter as (value: V, options: O) => string;
    //   default:
    //     return undefined;
    // }
  }

  getDataValue(source: DataValueSpec): DataValue<T> {
    switch (source.type) {
      case 'json':
        return new JsonValue(source);
      case 'path':
        return new PathValue(source);
      case 'query':
        return new QueryValue(source);
      default:
        throw new Error(`Unsupported data value type: ${source}`);
    }
  }
}

export const nextAppOptions = new NextAppOptions();
