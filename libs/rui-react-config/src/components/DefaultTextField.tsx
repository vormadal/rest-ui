// text field component based on input component
import React from 'react';
import RuiInput from './ruiInput';
import { extractField } from 'rui-core';
import { RuiField } from 'rui-core/app';
import { ComponentProps } from '../lib/ComponentProps';

export default function DefaultTextField({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;

  const value = extractField<string>(
    context.data[config.getOption<string>('dataSource')],
    config.fieldName
  ).get();
  return (
    <RuiInput
      type={config.dataType}
      defaultValue={value || ''}
      name={config.fieldName}
      label={config.displayName}
    />
  );
}
