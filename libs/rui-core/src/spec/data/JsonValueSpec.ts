export interface JsonValueSpec {
  type: 'json';
  
  /**
   * The json path of the field within the data source.
   */
  name: string;
  /**
   * The data source to use.
   */
  dataSource: string;

  /**
   * Whether the input or output object should be used from the data source.
   */
  source: 'input' | 'output';
}
