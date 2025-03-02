// text field component based on input component
import { DateTimePicker } from '@ui';
import * as React from 'react';
import { ComponentProps } from '../lib/ComponentProps';
import { RuiField } from 'rui-core/app';
import { extractField } from 'rui-core';

export default function DefaultDateTimeField({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;

  const value = extractField<string>(
    context.data[config.getOption<string>('dataSource')],
    config.fieldName
  ).get();
  const dateTimeValue = new Date(Date.parse(value));
  return <DateTimePicker value={dateTimeValue} granularity="day" />;
}
