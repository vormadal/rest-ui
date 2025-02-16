import { ComponentProps } from '../../lib/ComponentProps';
import { Endpoint } from './Endpoint';
import { RuiApp } from './RuiApp';
import { RuiComponent } from './RuiComponent';

export interface RuiContext<ComponentType> {
  /**
   * The configuration of the component within the current scope
   */
  config?: RuiComponent<React.FC<ComponentProps>>;

  /**
   * the actual route of the current page
   */
  route: string;

  navigateTo: (path: string) => void;
  app: RuiApp<ComponentType>;

  dataSources: Record<string, Endpoint<ComponentType>>;

  data: Record<string, unknown>;

  /**
   * The url of the endpoint that is in scope.
   * Initially this value will be a url template,
   * but after the endpoint parameters are resolved, it will be transformed to the actual url.
   */
  url?: string;

  /**
   * The template used for building the url
   */
  urlTemplate?: string;
}
