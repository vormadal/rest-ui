import { BaseFormattingOptions } from './BaseFormattingOptions.js';

export interface NumberFormattingOptions extends BaseFormattingOptions {
  locale: Intl.LocalesArgument;
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
  options: Intl.NumberFormatOptions;

}
