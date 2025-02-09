import { EndpointTemplate, RuiPageSpec } from 'rui-core';
import type { ApiBuilderContext } from './context/ApiBuilderContext';

import { HttpMethods } from './openApi/HttpMethods';

export class PageBuilder {
  constructor(
    public readonly endpoint: EndpointTemplate,
    public readonly context: ApiBuilderContext
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
              componentName: 'action-bar:button:default',
              type: 'action',
              label: 'Edit',
              action: {
                type: 'redirect',
                route: this.route + '/edit',
              },
            },
          ],
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
