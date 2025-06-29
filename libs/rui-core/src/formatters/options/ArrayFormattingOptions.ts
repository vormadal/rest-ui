import { DataType } from '../../DataType.js';
import { BaseFormattingOptions } from './BaseFormattingOptions.js';

export interface ArrayFormattingOptions extends BaseFormattingOptions {
  field?: string;
  formatter: DataType;
}
