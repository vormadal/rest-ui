import { OpenAPIV3 } from 'openapi-types';
import {
  ComponentSpec,
  DateTimeFormattingOptions,
  EndpointSpec,
  NumberFormattingOptions,
  prettifyFieldName
} from 'rui-core';
import { GeneratorOptions } from '../GeneratorOptions';
import { OpenAPISpec } from '../openApi/OpenAPISpec';
import { OperationSchema } from '../openApi/OperationSchema';
import { Schema } from '../openApi/Schema';

export class TableBuilder {
  private componentName = 'list:table:default';
  private dataField = '';
  private dataSource?: EndpointSpec;
  constructor(
    private readonly schema: Schema<
      OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject
    >,
    private readonly apiSpec: OpenAPISpec,
    private readonly options: GeneratorOptions
  ) {}

  withComponentName(componentName: string): this {
    this.componentName = componentName;
    return this;
  }

  withDataSource(endpoint: OperationSchema): this {
    this.dataSource = {
      name: endpoint.path,
      method: endpoint.method,
      routeTemplate: endpoint.path,
      parameters: [], // TODO handle from this.endpoint.parameters
    };
    return this;
  }

  /**
   * The schema of the array property of the endpoint response
   */
  get tableSchema() {
    const dataSchema = this.dataField
      ? this.schema?.properties?.find((x) => x.propertyName === this.dataField)
      : this.schema;

    if (dataSchema?.type !== 'array') {
      throw new Error('The data property must be an array');
    }
    return dataSchema;
  }

  getFormatter(prop: Schema<OpenAPIV3.SchemaObject>) {
    const name = `${prop.type}:${prop.format || prop.type}:default`;
    let options: unknown = {};
    switch (prop.format) {
      case 'date-time':
        options = {
          locale: 'da-dk',
          options: {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          },
        } as DateTimeFormattingOptions;
        break;
      case 'double':
        options = {
          locale: 'da-dk',
          options: {
            maximumFractionDigits: 2,
          },
        } as NumberFormattingOptions;
        break;
    }

    return { name, options };
  }

  get onClick() {
    if (!this.dataSource?.routeTemplate) {
      return undefined;
    }
    const viewOperation = this.apiSpec.operations.find(
      (x) =>
        x.path.startsWith(this.dataSource?.routeTemplate || '') &&
        // check if the path has a single path parameter after the matching route
        /{.+}\/?/.test(
          x.path.replace(this.dataSource?.routeTemplate || '', '')
        ) &&
        x.method.toLowerCase() === 'get'
    );
    if (!viewOperation) {
      return undefined;
    }

    const idProperty = this.tableSchema.properties.find(
      (x) => x.propertyName === 'id'
    );
    if (!idProperty) {
      return undefined;
    }

    return {
      urlTemplate: viewOperation.path,
      parameters: [
        {
          name: viewOperation.parameters[viewOperation.parameters.length - 1]
            .name,
          source: 'row',
          value: idProperty.propertyName,
        },
      ],
    };
  }

  get compatibleColumns() {
    const compatibleTypes = ['boolean', 'number', 'string', 'integer'];
    const columns = this.tableSchema.properties
      .filter((prop) => compatibleTypes.includes(prop.type || ''))
      .map((prop) => {
        const formatter = this.getFormatter(prop);
        return {
          name: prop.propertyName,
          displayName: prettifyFieldName(prop.propertyName),
          type: prop.type,
          formatter: formatter.name,
          formatterOptions: formatter.options,
        };
      });

    return columns;
  }

  /**
   *
   * @param propertyName of the endpoint response schema that contains the list of items
   * @returns
   */
  withDataField(propertyName: string): this {
    this.dataField = propertyName;
    return this;
  }

  build(): ComponentSpec {
    const columns = this.compatibleColumns;
    if (columns.length === 0) {
      throw new Error('No compatible columns found');
    }
    return {
      type: 'table',
      componentName: this.componentName,
      options: {
        dataSource: `${this.dataSource?.method}:${this.dataSource?.name}`,
        dataField: this.dataField,
        onClick: this.onClick,
        columns: this.compatibleColumns, // TODO handle type and formatting
      },
    };
  }
}
