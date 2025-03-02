import { RuiContext } from './RuiContext';
import { RuiAppOptions } from './RuiApp';
import { RuiDataMapping } from './RuiDataMapping';
import { EndpointSpec } from '../spec/EndpointSpec';

export class Endpoint<ComponentType> {
  name: string;
  method: string;
  routeTemplate: string;
  parameters: RuiDataMapping<ComponentType>[];

  /**
   * used for the http request body
   */
  input?: unknown;
  /**
   * is populated with the http response body after the request is made
   */
  output?: unknown;

  constructor(
    { method, routeTemplate, parameters }: EndpointSpec,
    options: RuiAppOptions<ComponentType>
  ) {
    this.method = method;
    this.routeTemplate = routeTemplate;
    this.name = routeTemplate; //TODO maybe make smarter?
    this.parameters =
      parameters?.map((x) => new RuiDataMapping<ComponentType>(x, options)) ??
      [];
  }

  async fetch<T>(context: RuiContext<ComponentType>): Promise<T> {
    context.url = this.routeTemplate;
    context.urlTemplate = this.routeTemplate;
    for (const param of this.parameters) {
      param.inject(context);
    }

    const response = await context.app.fetch(
      this.method,
      context.url,
      this.input
    );

    if (!response.ok) {
      console.error(
        `Error fetching ${context.url}> ${response.status}:${response.statusText}`,
        response
      );
      return this.output as T;
    }
    this.output = await response.json().catch((e: unknown) => {
      console.error(`Error parsing response ${context.url}`, e);
      return null;
    });
    return this.output as T;
  }

  get id(): string {
    return `${this.method}:${this.name}`;
  }
}
