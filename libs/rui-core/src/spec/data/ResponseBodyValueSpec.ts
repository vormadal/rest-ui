export interface ResponseBodyValueSpec {
  type: 'response-body';
  
  /**
   * The json path of the field within the data source.
   */
  name: string;
  /**
   * The data source to use.
   */
  dataSource: string;
}
