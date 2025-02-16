import { ComponentSpec, RuiPageSpec } from 'rui-core';

import { GeneratorOptions } from '../GeneratorOptions';
import { HttpMethods } from '../openApi/HttpMethods';

import { TableBuilder } from './TableBuilder';
import { OperationSchema } from '../openApi/OperationSchema';

export class PageBuilder {
  constructor(
    public readonly endpoint: OperationSchema,
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
    return new TableBuilder(this.endpoint.responseSchema)
      .withDataField(this.options.listFieldName || '')
      .withDataSource(this.endpoint);
  }

  get dataComponent(): ComponentSpec {
    switch (this.pageType) {
      case 'list':
        if (this.tableComponent.compatibleColumns.length > 0) {
          return this.tableComponent.build();
        }
        break;
      default:
    }
    return {
      type: 'container',
      componentName: 'container:default',
    };
  }

  build(): RuiPageSpec {
    return {
      type: 'page',
      route: this.route,
      showInMenu:
        this.endpoint.method === HttpMethods.GET &&
        (this.endpoint.parameters?.length || 0) === 0,
      componentName: 'page:default',
      components: [
        {
          type: 'action-bar',
          componentName: 'layout:action-bar:default',
          components: [
            {
              //TODO check if this page exists?
              componentName: 'action-bar:button:default',
              type: 'action',
              label: 'Create',
              action: {
                type: 'redirect',
                route: this.route + '/create',
              },
            },
          ],
        },
        this.dataComponent,
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
          parameters: [],
        },
      ],
    };
  }
}
