export interface GeneratorOptions {
  /**
   * The name of the field in an endpoint response schema that contains the list of items to display.
   * Use this if the get operation returns a list of items in a field that is not the root of the response.
   */
  listFieldName?: string;
}
