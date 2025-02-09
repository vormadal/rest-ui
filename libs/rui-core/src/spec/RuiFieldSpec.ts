import { DataType } from '../DataType.js';
import { ComponentSpec } from './ComponentSpec.js';

/**
 * This is the general field options for a field in a page
 */
export interface RuiFieldSpec extends ComponentSpec {
  hidden?: boolean;
  dataType: DataType;
  fieldName: string;
  displayName: string;

  /**
   * The name of the formatter to be used to format the value of this field
   */
  formatter?: string;
  /**
   * Options to be passed to the formatter
   */
  formatterOptions?: unknown;

  options?: unknown;
}
