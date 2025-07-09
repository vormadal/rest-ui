export interface RequestBodyValueSpec {
  type: 'request-body';
  
  /**
   * The json path of the field within the data source.
   */
  name: string;
  /**
   * The data source to use.
   */
  dataSource: string;
}
