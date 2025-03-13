'use client';
// text field component based on input component
import { DateTimePicker } from '@ui';
import { ComponentConfiguration } from 'rui-core';
import { RuiField } from 'rui-core/app';
import { ComponentProps } from '../lib/ComponentProps';
import { ReactRuiComponent } from '../lib/ReactRuiComponent';

function DefaultDateTimeComponent({ context }: ComponentProps) {
  const config = context.config as RuiField<ReactRuiComponent>;

  const value = config.getFieldValue<string>(
    context.data,
    'dataSource',
    config.fieldName
  );
  const dateTimeValue = value ? new Date(Date.parse(value)) : undefined;
  return <DateTimePicker value={dateTimeValue} granularity="day" />;
}

const DefaultDateTimeField: ComponentConfiguration<ReactRuiComponent> = {
  component: DefaultDateTimeComponent,
  name: 'field:string:date-time',
  options: [
    {
      name: 'dataSource',
      type: 'string',
    },
  ],
};

export default DefaultDateTimeField;
