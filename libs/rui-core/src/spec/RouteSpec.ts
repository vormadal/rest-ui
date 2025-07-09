/**
 * RouteSpec defines the structure of a route.
 * This can be a page route or an API route.
 */
export interface RouteSpec {
  /**
   * The route template e.g. /users/{userId}
   */
  template: string;

  parameters: RouteParameter[];
}

export interface RouteParameter {
  name: string;
  type: string;
  in: 'path' | 'query';
  required?: boolean;
}
