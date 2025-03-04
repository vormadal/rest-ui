'use client';
// text field component based on input component
import { DateTimePicker } from '@ui';
import * as React from 'react';
import { ComponentConfiguration } from 'rui-core';
import { RuiField } from 'rui-core/app';
import { ComponentProps } from '../lib/ComponentProps';

function DefaultDateTimeComponent({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;

  const value = config.getFieldValue<string>(
    context.data,
    'dataSource',
    config.fieldName
  );
  const dateTimeValue = value ? new Date(Date.parse(value)) : undefined;
  return <DateTimePicker value={dateTimeValue} granularity="day" />;
}

const DefaultDateTimeField: ComponentConfiguration<React.FC<ComponentProps>> = {
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
