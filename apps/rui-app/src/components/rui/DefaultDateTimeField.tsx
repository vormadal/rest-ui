// text field component based on input component
import { DateTimePicker } from '@ui';
import * as React from 'react';
import { RuiField } from '../../core/app/fields/RuiField';
import { ComponentProps } from '../../lib/ComponentProps';
import { extractField } from '../../lib/utils';

export default function DefaultDateTimeField({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;

  const value = extractField<string>(
    context.data[config.getOption<string>('dataSource')],
    config.fieldName
  ).get();
  const dateTimeValue = new Date(Date.parse(value));
  return <DateTimePicker value={dateTimeValue} granularity="day" />;
}
