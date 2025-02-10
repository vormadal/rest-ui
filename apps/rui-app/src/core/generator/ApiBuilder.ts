import { OpenAPIV3 } from 'openapi-types';
import { EndpointTemplate } from 'rui-core';
import { EndpointTemplateBuilder } from './EndpointTemplateBuilder';
import { ApiBuilderContext } from './context/ApiBuilderContext';
import { HttpMethods } from './openApi/HttpMethods';

export class ApiBuilder {
  readonly context: ApiBuilderContext;

  constructor(readonly document: OpenAPIV3.Document) {
    this.context = new ApiBuilderContext(document);
  }

  build(): EndpointTemplate[] {
    const version = this.document.openapi;
    if (version.startsWith('3')) {
      return this.buildV3();
    }

    throw new Error('this document type cannot be handled');
  }

  private buildV3(): EndpointTemplate[] {
    if (!this.document?.paths) return [];

    const paths = Object.keys(this.document.paths);
    const endpoints: EndpointTemplate[] = [];

    const relevantMethods = [
      HttpMethods.GET,
      HttpMethods.POST,
      HttpMethods.PUT,
      HttpMethods.DELETE,
    ];

    for (const path of paths) {
      const methods = Object.keys(
        this.document.paths[path] || {}
      ) as HttpMethods[];

      for (const method of methods.filter((x) => relevantMethods.includes(x))) {
        endpoints.push(
          new EndpointTemplateBuilder(path, method, this.context).build()
        );
      }
    }

    return endpoints;
  }
}
