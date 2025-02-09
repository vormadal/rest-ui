import React from 'react';
import {
  ActionComponentSpec,
  ComponentSpec,
  DataType,
  DataValueSpec,
  defaultArrayFormatter,
  defaultDateFormatter,
  defaultDateTimeFormatter,
  defaultNumberFormatter,
  defaultTimeFormatter,
  RuiActionSpec,
  RuiApiActionSpec,
  RuiCompositeActionSpec,
  RuiFieldSpec,
  RuiPageSpec,
  RuiRedirectActionSpec,
} from 'rui-core';
import DefaultCheckboxField from '../components/rui/DefaultCheckboxField';
import DefaultListPage from '../components/rui/DefaultListPage';
import DefaultTableCell from '../components/rui/DefaultTableCell';
import DefaultTextField from '../components/rui/DefaultTextField';
import { ActionComponent } from '../core/app/ActionComponent';
import { DataValue } from '../core/app/DataValue';
import { JsonValue } from '../core/app/JsonValue';
import { PathValue } from '../core/app/PathValue';
import { QueryValue } from '../core/app/QueryValue';
import { ComponentSelector, RuiAppOptions } from '../core/app/RuiApp';
import { RuiComponent } from '../core/app/RuiComponent';
import { RuiAction } from '../core/app/actions/RuiAction';
import { RuiApiAction } from '../core/app/actions/RuiApiAction';
import { RuiCompositeAction } from '../core/app/actions/RuiCompositeAction';
import { RuiRedirectAction } from '../core/app/actions/RuiRedirectAction';
import { RuiField } from '../core/app/fields/RuiField';
import { ComponentProps } from './ComponentProps';
import { RuiPage } from '../core/app/RuiPage';
import { ErrorComponent } from '../core/app/ErrorComponent';
import DefaultErrorComponent from '../components/rui/DefaultErrorComponent';
import ActionBar from '../components/rui/ActionBar';
import ActionBarButton from '../components/rui/ActionBarButton';
import DefaultPage from '../components/rui/DefaultPage';

type T = React.FC<ComponentProps>;
const componentConfigurationValues: {
  [key: string]: (
    spec: ComponentSpec,
    options: RuiAppOptions<T>
  ) => RuiComponent<T>;
} = {
  action: (spec, options) =>
    new ActionComponent<T>(spec as ActionComponentSpec, options),
  field: (spec, options) => new RuiField(spec as RuiFieldSpec, options),
  page: (spec, options) => new RuiPage<T>(spec as RuiPageSpec, options),
};

const defaultComponents: {
  [key: string]: T;
} = {
  'field:checkbox:default': DefaultCheckboxField,
  'field:text:default': DefaultTextField,
  'table:cell:default': DefaultTableCell,
  'page:default': DefaultPage,
  'error:default': DefaultErrorComponent,
  'layout:action-bar:default': ActionBar,
  'action-bar:button:default': ActionBarButton,
};

class NextAppOptions implements RuiAppOptions<T> {
  componentConfigurationValues = componentConfigurationValues;
  components = defaultComponents;

  reset() {
    this.components = defaultComponents;
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
  getComponent({ spec, name }: ComponentSelector): React.FC<ComponentProps> {
    return defaultComponents[`${spec.componentName}`];
  }

  getFormatter<V, O>(
    type: DataType
  ): undefined | ((value: V, options: O) => string) {
    switch (type) {
      case DataType.DATE:
        return defaultDateFormatter as (value: V, options: O) => string;
      case DataType.DATE_TIME:
        return defaultDateTimeFormatter as (value: V, options: O) => string;
      case DataType.NUMBER:
        return defaultNumberFormatter as (value: V, options: O) => string;
      case DataType.TIME:
        return defaultTimeFormatter as (value: V, options: O) => string;
      case DataType.STRING:
      case DataType.BUTTON:
      case DataType.BOOLEAN:
      case DataType.LOOKUP:
      case DataType.OBJECT:
        return undefined;
      case DataType.ARRAY:
        return defaultArrayFormatter as (value: V, options: O) => string;
      default:
        return undefined;
    }
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
