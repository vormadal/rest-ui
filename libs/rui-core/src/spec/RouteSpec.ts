
export interface RouteSpec {
  /**
   * The route template e.g. /users/{userId}
   */
  template: string;

  parameters: {
    name: string;
    type: string;
    in: 'path' | 'query';
    required?: boolean;
  }[];
}
