import { ComponentSpec, prettifyFieldName, RuiPageSpec } from 'rui-core';

import { GeneratorOptions } from '../GeneratorOptions';
import { HttpMethods } from '../openApi/HttpMethods';

import { TableBuilder } from './TableBuilder';
import { OperationSchema } from '../openApi/OperationSchema';
import { OpenAPISpec } from '../openApi/OpenAPISpec';

export class PageBuilder {
  constructor(
    public readonly endpoint: OperationSchema,
    private readonly apiSpec: OpenAPISpec,
    public readonly options: GeneratorOptions
  ) {}

  get route(): string {
    switch (this.endpoint.method) {
      case HttpMethods.PUT:
        return this.endpoint.path + '/edit'; // append '/edit' otherwise the route is the same as the 'read' route
      case HttpMethods.POST:
        return this.endpoint.path + '/create'; // append '/create' otherwise the route is the same as the 'list' route
      default:
        return this.endpoint.path;
    }
  }

  get pageType(): 'list' | 'create' | 'edit' | 'read' {
    const dataProperty = this.options.listFieldName
      ? this.endpoint.responseSchema?.properties.find(
          (x) => x.propertyName === this.options.listFieldName
        )
      : this.endpoint.responseSchema;
    switch (this.endpoint.method) {
      case HttpMethods.GET:
        if (dataProperty?.type === 'array') {
          return 'list';
        }
        return 'read';
      case HttpMethods.POST:
        return 'create';
      case HttpMethods.PUT:
        return 'edit';
      default:
        return 'read';
    }
  }

  get tableComponent() {
    if (!this.endpoint.responseSchema) {
      throw new Error(
        'Response schema is missing. Cannot build table without response schema'
      );
    }
    return new TableBuilder(
      this.endpoint.responseSchema,
      this.apiSpec,
      this.options
    )
      .withDataField(this.options.listFieldName || '')
      .withDataSource(this.endpoint);
  }

  get viewComponent(): ComponentSpec[] {
    return (
      this.endpoint.responseSchema?.properties
        .filter((x) => !['array', 'object'].includes(x.type || ''))
        .map((x) => {
          return {
            type: 'field',
            componentName: `field:${x.type}:${x.format || 'default'}`,
            options: {
              dataType: x.type,
              name: x.propertyName,
              displayName: prettifyFieldName(x.propertyName),
              formatter: `${x.type}:${x.format || x.type}:default`,
              dataSource: `${this.endpoint.method}:${this.endpoint.path}`,
            },
          };
        }) || []
    );
  }

  get createAction() {
    const createOperation = this.apiSpec.operations.find(
      (x) => x.path == this.endpoint.path && x.method.toLowerCase() === 'post'
    );
    if (!createOperation) {
      return undefined;
    }
    return {
      componentName: 'action-bar:button:default',
      type: 'action',
      options: {
        label: 'Create',
      },
      action: {
        type: 'redirect',
        urlTemplate: this.route + '/create',
      },
    };
  }

  get actionComponents(): ComponentSpec[] {
    const components: ComponentSpec[] = [];
    switch (this.pageType) {
      case 'list':
        if (this.createAction) {
          components.push(this.createAction);
        }
        break;
      default:
    }
    return components;
  }

  get dataComponent(): ComponentSpec[] {
    switch (this.pageType) {
      case 'list':
        if (this.tableComponent.compatibleColumns.length > 0) {
          return [this.tableComponent.build()];
        }
        break;
      case 'read':
      case 'create':
        return this.viewComponent;
      default:
    }
    return [
      {
        type: 'container',
        componentName: 'container:default',
        options: {},
      },
    ];
  }

  build(): RuiPageSpec {
    return {
      type: 'page',
      options: {
        route: this.route,
        showInMenu:
          this.endpoint.method === HttpMethods.GET &&
          (this.endpoint.parameters?.length || 0) === 0,
      },
      componentName: 'page:default',
      components: [
        {
          type: 'action-bar',
          componentName: 'layout:action-bar:default',
          components: this.actionComponents,
          options: {},
        },
        ...this.dataComponent,
        // action bar component, with buttons for actions
        // list component, with table and pagination
        // form component, with fields for input (create/edit)
      ],
      dataScope: '$',
      dataSources: [
        {
          name: this.endpoint.path,
          method: this.endpoint.method,
          routeTemplate: this.endpoint.path,
          parameters: this.endpoint.parameters.map((x) => ({
            source: {
              type: 'path',
              name: x.name,
            },
            target: {
              type: 'path',
              name: x.name,
            },
          })),
        },
      ],
    };
  }
}
