import {
  ArraySchemaObject,
  EndpointTemplate,
  RuiPageSpec,
  SchemaObject,
} from 'rui-core';

import { GeneratorOptions } from './GeneratorOptions';
import { HttpMethods } from './openApi/HttpMethods';

export class PageBuilder {
  constructor(
    public readonly endpoint: EndpointTemplate,
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

  get spec(): RuiPageSpec {
    const schema = this.endpoint.responseSchema as ArraySchemaObject;
    const itemSchema =
      this.options.schemaResolver.resolveReference<SchemaObject>(
        schema.items ?? schema
      );
    const propertyNames = Object.keys(itemSchema.properties || {});

    console.log('propertyNames', this.route, propertyNames, schema);
    const columns = propertyNames.map((name) => ({
      name,
      displayName: name,
    }));
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
        {
          type: 'table',
          componentName: 'list:table:default',
          dataSources: [
            {
              name: this.endpoint.path,
              method: 'GET',
              routeTemplate: this.endpoint.path,
              parameters: [], // TODO handle parameters
            },
          ],
          options: {
            dataSource: `${this.endpoint.method}:${this.endpoint.path}`,
            dataField: this.options.listFieldName,
            columns: columns, // TODO handle type and formatting
          },
        },
        // action bar component, with buttons for actions
        // list component, with table and pagination
        // form component, with fields for input (create/edit)
      ],
      dataScope: '$',
      dataSources: [],
    };
  }
}
