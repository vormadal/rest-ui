import { BaseFormattingOptions } from './BaseFormattingOptions.js'

export interface DateTimeFormattingOptions extends BaseFormattingOptions {
  locale?: Intl.LocalesArgument
  options?: Intl.DateTimeFormatOptions
}
